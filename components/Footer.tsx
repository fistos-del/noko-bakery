import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] text-[#1a1a1a] pt-16 pb-8 border-t border-gray-200 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">NOKO</h2>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mt-1">Artisan Bakery</p>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-xs">
            Handmade breads, pastries, and curated boxes<br />
            delivered fresh to Pretoria East. Made with care,<br />
            baked with love.
          </p>
          <div className="bg-[#e6dac3] text-[#4a3f35] px-4 py-2 rounded-md inline-block w-fit text-xs font-medium mt-2">
            Now baking: Autumn Danishes.
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold tracking-widest uppercase text-xs mb-2">Shop</h3>
          <Link href="/shop" className="text-gray-600 hover:text-black">All Products</Link>
          <Link href="/subscribe" className="text-gray-600 hover:text-black">Subscribe & Save</Link>
          <Link href="/delivery" className="text-gray-600 hover:text-black">Delivery Info</Link>
          <Link href="/account" className="text-gray-600 hover:text-black">My Account</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold tracking-widest uppercase text-xs mb-2">Info</h3>
          <p className="text-gray-600">R25 flat delivery fee</p>
          <p className="text-gray-600">15–20km radius</p>
          <p className="text-gray-600">Collection 8–10am</p>
          <p className="text-gray-600">Allergens: Gluten, Dairy, Egg</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold tracking-widest uppercase text-xs mb-2">Contact</h3>
          <p className="text-gray-600">Mooikloof Glen Country Estate</p>
          <p className="text-gray-600">Corner Garsfontein Rd & Topaz Crescent</p>
          <p className="text-gray-600">Pretoria East</p>
          <a href="https://wa.me/27000000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-black mt-2">
            <span className="text-lg text-[#a48bb5]">💬</span> WhatsApp Us
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 Noko Bakery. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black">Terms of Sale</Link>
          <Link href="/popia" className="hover:text-black">POPIA Compliant</Link>
        </div>
      </div>
    </footer>
  );
}
