export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 font-heading text-4xl font-bold text-primary-900">
        Mentions légales
      </h1>
      <div className="prose">
        <p>
          <strong>Éditeur du site :</strong> Jegonflable Aube
          <br />
          12 rue des Châteaux, 10000 Troyes
          <br />
          contact@jegonflable-aube.fr — 06 12 34 56 78
        </p>
        <p>
          <strong>Hébergement :</strong> Vercel Inc., San Francisco, États-Unis.
        </p>
        <p>
          <strong>Conception :</strong> WEBOMAX, Troyes.
        </p>
      </div>
    </div>
  );
}
