import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open and lock scroll position
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Lock scroll position (already stored in handleMenuToggle)
      const scrollY = scrollYRef.current;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      // Clean up styles (scroll restoration handled in handleMenuToggle)
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
    }
    return () => {
      // Cleanup on unmount
      const scrollY = scrollYRef.current;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (scrollY !== undefined && scrollY !== null && scrollY >= 0) {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
      }
    };
  }, [isMobileMenuOpen]);

  const handleMenuToggle = () => {
    if (!isMobileMenuOpen) {
      // Store scroll position before opening
      scrollYRef.current = window.scrollY;
      
      // Force a reflow to ensure we have the correct scroll position
      void document.body.offsetHeight;
      
      // Small delay to ensure browser has processed before opening menu
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMobileMenuOpen(true);
        });
      });
    } else {
      // Restore scroll position BEFORE closing menu to prevent jump
      const scrollY = scrollYRef.current;
      
      // Remove fixed positioning first
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.left = '';
      document.body.style.right = '';
      
      // Immediately restore scroll position synchronously
      if (scrollY !== undefined && scrollY !== null && scrollY >= 0) {
        document.documentElement.scrollTop = scrollY;
        if (document.body) {
          document.body.scrollTop = scrollY;
        }
        window.scrollTo(0, scrollY);
      }
      
      // Then close the menu
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setIsMobileMenuOpen(false);
      // Small delay to allow the menu to close smoothly before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 ${
        isMobileMenuOpen 
          ? 'bg-transparent py-8' 
          : isScrolled 
            ? 'bg-maroon-950/95 backdrop-blur-md shadow-2xl py-4 transition-all duration-500 ease-in-out' 
            : 'bg-transparent py-8 transition-all duration-500 ease-in-out'
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center relative z-50">
        {/* Brand Name - Top Left */}
        <div className={`font-serif text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300 text-white`}>
          HEAVENS HARMONY
        </div>

        {/* Desktop Menu - Top Right */}
        <div className="hidden md:flex space-x-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-white/80 hover:text-gold-500 transition-colors text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-gold-500 transition-colors relative z-50"
          onClick={handleMenuToggle}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-maroon-950 z-40 flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{
          transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out',
          willChange: 'opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => scrollToSection(e, item.href)}
            className="text-white text-2xl font-serif hover:text-gold-500"
            style={{ 
              transition: `opacity 0.5s ease-in-out ${index * 100 + 100}ms, transform 0.5s ease-in-out ${index * 100 + 100}ms`,
              willChange: 'transform, opacity',
              transform: isMobileMenuOpen ? 'translateY(0) translateZ(0)' : 'translateY(1rem) translateZ(0)',
              opacity: isMobileMenuOpen ? 1 : 0,
              backfaceVisibility: 'hidden',
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;