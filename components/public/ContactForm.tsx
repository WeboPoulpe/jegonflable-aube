"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    // Simulé pour l'instant — un vrai endpoint /api/contact sera
    // ajouté plus tard. Pour le stage, on simule la réussite.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border-2 border-success/30 bg-success/10 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-success" />
        <h3 className="mb-1 font-heading text-2xl font-bold text-success">
          Message envoyé !
        </h3>
        <p className="text-sm text-gray-700">On te répond dès que possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" label="Nom" placeholder="Marie Dupont" required />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="marie@exemple.fr"
        required
      />
      <Input
        name="phone"
        type="tel"
        label="Téléphone"
        placeholder="06 12 34 56 78"
      />
      <Textarea
        name="message"
        label="Message"
        placeholder="Une question, une demande..."
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-600 px-6 py-3 font-heading font-bold text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg disabled:opacity-50"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Envoyer
      </button>
    </form>
  );
}
