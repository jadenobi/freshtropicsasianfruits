import Link from 'next/link'
import Image from 'next/image'
import CartCount from './CartCount'

export default function Header(){
  return (
    <header className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700 shadow-2xl border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-24">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="transform group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
              <Image src="/logo.svg" alt="Fresh Tropics Asian Fruits" width={64} height={64} className="filter brightness-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 tracking-tight drop-shadow-md">
                Fresh Tropics
              </span>
              <span className="text-xs font-bold text-amber-100 tracking-widest uppercase drop-shadow-md">
                ✦ Asian Fruits ✦
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/shop" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/shop?category=pinkglow" className="relative text-pink-200 font-bold text-sm uppercase tracking-wide hover:text-pink-100 transition-all duration-300 group">
              🌸 Pink Glow Pineapple
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-300 to-pink-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/about" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
            <Link href="/contact" className="relative text-amber-50 font-semibold text-sm uppercase tracking-wide hover:text-amber-200 transition-all duration-300 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-100 group-hover:w-full transition-all duration-500"></span>
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-all text-sm hover:shadow-lg">
              <span className="text-lg">🤍</span>
              <span className="hidden md:inline">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-emerald-900 font-bold rounded-full shadow-lg hover:shadow-2xl hover:from-amber-300 hover:via-amber-200 hover:to-yellow-200 transition-all duration-300 group">
              <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M7 4V3c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v1h4c.6 0 1 .4 1 1v2c0 .3-.1.5-.3.7L19 20c-.2 1.1-1.1 2-2.3 2H7.3c-1.2 0-2.1-.9-2.3-2L2.3 7.7C2.1 7.5 2 7.3 2 7V5c0-.6.4-1 1-1h4zm2 2h6V4H9v2zm8.2 15H6.8l1.5-11h11.4l-1.5 11z"/>
              </svg>
              <span className="text-sm font-black">CART</span>
              <CartCount />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative bottom bar */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-70"></div>
    </header>
  )
}
