import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// =========================================
// Configuration NextAuth v4
// =========================================
// Stratégie : Credentials (email/password)
// Session : JWT (pas d'adapter DB nécessaire,
// on lit User directement dans authorize).
// =========================================

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // BUG-04 : comparaison de mot de passe en clair au lieu d'utiliser bcrypt.compare
        // Conséquence : impossible de se connecter (le hash bcrypt en DB
        // ne sera jamais égal au mot de passe en clair saisi).
        const isValid = credentials.password === user.password;

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          role: user.role,
          onboardingCompletedAt: user.onboardingCompletedAt,
          onboardingStep: user.onboardingStep,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.onboardingCompletedAt = user.onboardingCompletedAt;
        token.onboardingStep = user.onboardingStep;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.onboardingCompletedAt = token.onboardingCompletedAt;
        session.user.onboardingStep = token.onboardingStep;
      }
      return session;
    },
  },
};

// Helper pour hasher un mot de passe (à utiliser dans les Server Actions
// d'inscription / changement de mot de passe).
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}
