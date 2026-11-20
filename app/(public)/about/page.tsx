import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-black mb-6">About Noko Bakery</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        Noko Bakery is a small-batch artisan bakery rooted in Pretoria East. We
        hand-shape every loaf, slow-ferment our doughs, and bake fresh every
        morning.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        From sourdough and focaccia to buttery croissants and curated boxes, our
        menu is built around local ingredients and traditional techniques.
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        We deliver within a 15–20km radius of Mooikloof Glen Country Estate, and
        offer collection between 8–10am. Allergens: Gluten, Dairy, Egg.
      </p>
      <Link
        href="/shop"
        className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Browse the Shop
      </Link>
    </div>
  );
}
