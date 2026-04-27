import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "SUPER_ADMIN" | "ADMIN";
      onboardingCompletedAt: Date | null;
      onboardingStep: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "SUPER_ADMIN" | "ADMIN";
    onboardingCompletedAt: Date | null;
    onboardingStep: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "SUPER_ADMIN" | "ADMIN";
    onboardingCompletedAt: Date | null;
    onboardingStep: number;
  }
}
