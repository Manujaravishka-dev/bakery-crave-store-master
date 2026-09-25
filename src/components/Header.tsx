import React, { useState, useEffect } from "react";
import CartButton from "./CartButton";

type HeaderProps = {
  currentPath?: string;
};

export function Header({ currentPath }: HeaderProps) {
  const [pathname, setPathname] = useState(currentPath ?? "/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    document.addEventListener('astro:page-load', updatePath);
    return () => document.removeEventListener('astro:page-load', updatePath);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Cerrar menú móvil al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  const linkClass = (isActive: boolean) =>
    `hover:text-crave-rosa transition-colors ${isActive ? 'text-crave-rosa' : ''}`;

  const normalizedPath = pathname.replace(/\/+$/, "");
  const isHome = normalizedPath === "";
  const isMenu =
    normalizedPath === "/menu" || normalizedPath.startsWith("/menu/");
  const isAbout = normalizedPath === "/about";
  const isContact = normalizedPath === "/contact";
  const isGallery = normalizedPath === "/gallery";

  return (
    <header
      className={`sticky top-0 left-0 right-0 w-full z-[9999] backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-crave-rosa" : "bg-crave-pastel"
      }`}
    >
      <nav
        style={{ transition: "padding 300ms ease" }}
        className={`flex justify-between items-center gap-x-2 sm:gap-x-4 md:gap-x-10 px-4 sm:px-8 md:px-12 lg:px-20 ${
          isScrolled ? "py-3 sm:py-4 md:py-5 lg:py-5" : "py-4 sm:py-6 md:py-8 lg:py-10"
        }`}>
        <a
          href="/"
          onClick={handleLinkClick}
          aria-label="Twinkle Bakes — Home"
          className="group flex items-center gap-[5px] leading-none shrink-0"
        >
          <span className="font-playfair italic font-medium tracking-[-0.02em] text-crave-night text-lg sm:text-xl lg:text-2xl">
            Twinkle
          </span>
          <span
            aria-hidden="true"
            className="inline-block w-[7px] h-[7px] bg-crave-rosa opacity-80 mt-[3px] transition-transform duration-500 ease-out group-hover:rotate-[135deg] group-hover:scale-110"
            style={{
              clipPath:
                "polygon(50% 0%, 58% 42%, 100% 50%, 58% 58%, 50% 100%, 42% 58%, 0% 50%, 42% 42%)",
            }}
          ></span>
          <span className="font-playfair italic font-medium tracking-[-0.02em] text-crave-rosa text-lg sm:text-xl lg:text-2xl">
            Bakes
          </span>
        </a>
        
        {/* Botón de menú para móvil */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <CartButton />
          <button
            className="flex flex-col justify-center items-center w-8 h-8"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
          <span className={`block w-6 h-0.5 bg-crave-night mb-1.5 transition-transform ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-crave-night mb-1.5 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-crave-night transition-transform ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Menú para pantallas medianas y grandes */}
        <ul className="hidden md:flex gap-x-4 items-center justify-center">
          <li>
            <a href="/" className={linkClass(isHome)}>Home</a>
          </li>
          <li>
            <a href="/menu" className={linkClass(isMenu)}>Menu</a>
          </li>
          <li>
            <a href="/gallery" className={linkClass(isGallery)}>Gallery</a>
          </li>
          <li>
            <a href="/about" className={linkClass(isAbout)}>About</a>
          </li>
          <li>
            <a href="/contact" className={linkClass(isContact)}>Contact</a>
          </li>
        </ul>
        
        <div className="hidden md:flex items-center gap-4">
          <p className="text-xs max-w-[200px] lg:max-w-none text-right">
            VISUAL BRAND DESIGN / ART DIRECTION: LEANDRA RANGEL
          </p>
          <CartButton />
        </div>
      </nav>
      
      {/* Menú móvil desplegable */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isMobileMenuOpen ? 'min-h-screen opacity-100' : 'max-h-0 opacity-0'
      } bg-crave-pastel`}>
        <ul className="flex flex-col items-center py-2 px-4">
          <li className="w-full border-b border-crave-night/10 py-2">
            <a 
              href="/" 
              className="block text-center hover:text-crave-rosa transition-colors"
              onClick={handleLinkClick}
            >
              Home
            </a>
          </li>
          <li className="w-full border-b border-crave-night/10 py-2">
            <a
              href="/menu"
              className={`block text-center hover:text-crave-rosa transition-colors ${isMenu ? 'text-crave-rosa' : ''}`}
              onClick={handleLinkClick}
            >
              Menu
            </a>
          </li>
          <li className="w-full border-b border-crave-night/10 py-2">
            <a
              href="/gallery"
              className={`block text-center hover:text-crave-rosa transition-colors ${isGallery ? 'text-crave-rosa' : ''}`}
              onClick={handleLinkClick}
            >
              Gallery
            </a>
          </li>
          <li className="w-full border-b border-crave-night/10 py-2">
            <a 
              href="/about" 
              className={`block text-center hover:text-crave-rosa transition-colors ${isAbout ? 'text-crave-rosa' : ''}`}
              onClick={handleLinkClick}
            >
              About
            </a>
          </li>
          <li className="w-full py-2">
            <a 
              href="/contact" 
              className={`block text-center hover:text-crave-rosa transition-colors ${isContact ? 'text-crave-rosa' : ''}`}
              onClick={handleLinkClick}
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="text-center py-2 px-4 text-xs">
          VISUAL BRAND DESIGN / ART DIRECTION: LEANDRA RANGEL
        </div>
      </div>
    </header>
  );
}