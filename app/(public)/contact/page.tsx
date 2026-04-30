import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-2 font-heading text-5xl font-bold text-primary-900">
        Contactez-nous
      </h1>
      <p className="mb-10 text-gray-600">
        Une question ? Un projet d'événement ? On est là pour t'aider.
      </p>

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-heading text-2xl font-bold text-primary-800">
              Envoyer un message
            </h2>
            <ContactForm />
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border-2 border-primary/10 bg-cream p-5 shadow-sm">
            <Mail className="mb-2 h-6 w-6 text-primary" />
            <div className="text-xs font-bold uppercase text-gray-500">
              Email
            </div>
            <a
              href="mailto:contact@jegonflable-aube.fr"
              className="font-heading text-lg font-bold text-primary-800 hover:text-primary"
            >
              contact@jegonflable-aube.fr
            </a>
          </div>
          <div className="rounded-2xl border-2 border-primary/10 bg-cream p-5 shadow-sm">
            <Phone className="mb-2 h-6 w-6 text-primary" />
            <div className="text-xs font-bold uppercase text-gray-500">
              Téléphone
            </div>
            <a
              href="tel:+33612345678"
              className="font-heading text-lg font-bold text-primary-800 hover:text-primary"
            >
              06 12 34 56 78
            </a>
          </div>
          <div className="rounded-2xl border-2 border-primary/10 bg-cream p-5 shadow-sm">
            <MapPin className="mb-2 h-6 w-6 text-primary" />
            <div className="text-xs font-bold uppercase text-gray-500">
              Adresse
            </div>
            <div className="font-heading text-lg font-bold text-primary-800">
              12 rue des Châteaux
              <br />
              10000 Troyes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
