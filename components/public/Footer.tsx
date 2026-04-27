import Link from "next/link";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t-4 border-primary/30 bg-primary-900 text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2 font-heading text-xl font-bold">
            <Sparkles className="h-5 w-5 text-accent" />
            Jegonflable Aube
          </div>
          <p className="text-sm text-cream/80">
            Location de jeux gonflables à Troyes et dans toute l'Aube.
            Anniversaires, événements, mariages.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-accent">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-accent">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/jeux" className="hover:text-accent">
                Nos jeux
              </Link>
            </li>
            <li>
              <Link href="/devis" className="hover:text-accent">
                Demander un devis
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-accent">
                À propos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-accent">
            Légal
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              {/* BUG-01 : typo volontaire "Mentions légals" au lieu de "Mentions légales".
                  Sert de pont avec l'étape 5 de l'onboarding (le stagiaire corrige
                  cette typo et débloque le code PREMIERPAS). */}
              <Link
                href="/mentions-legales"
                className="hover:text-accent"
              >
                Mentions légals
              </Link>
            </li>
            {/* BUG-20 (TROU STAGIAIRE) : ajouter ici les liens RGPD + CGU.
                Voir BUGS_HINTS.md → BUG-20 */}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-lg font-bold text-accent">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              12 rue des Châteaux, 10000 Troyes
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              06 12 34 56 78
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              contact@jegonflable-aube.fr
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-700 px-6 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} Jegonflable Aube — Site réalisé par
        WEBOMAX
      </div>
    </footer>
  );
}
