import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f4] text-[#1a1a1a] pt-16 pb-8 border-t border-gray-200 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-black">NOKO</h2>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-1 text-black">Artisan Bakery</p>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-xs mt-4">
            Handmade breads, pastries, and curated boxes<br />
            delivered fresh to Pretoria East. Made with care,<br />
            baked with love.
          </p>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-black uppercase text-xs mb-2 tracking-wider">Shop</h3>
          <Link href="/shop" className="text-gray-500 hover:text-black transition-colors">All Products</Link>
          <Link href="/subscribe" className="text-gray-500 hover:text-black transition-colors">Subscribe & Save</Link>
          <Link href="/delivery" className="text-gray-500 hover:text-black transition-colors">Delivery Info</Link>
          <Link href="/account" className="text-gray-500 hover:text-black transition-colors">My Account</Link>
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-black uppercase text-xs mb-2 tracking-wider">Info</h3>
          <p className="text-gray-500">R25 flat delivery fee</p>
          <p className="text-gray-500">15–20km radius</p>
          <p className="text-gray-500">Collection 8–10am</p>
          <p className="text-gray-500">Allergens: Gluten, Dairy, Egg</p>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-black uppercase text-xs mb-2 tracking-wider">Contact</h3>
          <p className="text-gray-500">Mooikloof Glen Country Estate</p>
          <p className="text-gray-500">Corner Garsfontein Rd & Topaz Crescent</p>
          <p className="text-gray-500">Pretoria East</p>
          
          <a href="https://wa.me/27000000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-black mt-2 transition-colors">
            <span className="text-lg text-[#b8a4c9]">💬</span> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 Noko Bakery. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black transition-colors">Terms of Sale</Link>
          <Link href="/popia" className="hover:text-black transition-colors">POPIA Compliant</Link>
        </div>
      </div>
    </footer>
  );
}
