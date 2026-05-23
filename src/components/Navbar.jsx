import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const isHidden = useRef(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  // ── Entry animation ──────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );
    tl.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0, rotation: -20 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.1,
        ease: "back.out(1.7)",
      },
      "-=0.7",
    );
  }, []);

  // ── Hide on scroll down, show on scroll up ───────────
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;

      if (currentY < 10) {
        // Top of page — always show
        if (isHidden.current) {
          gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out" });
          isHidden.current = false;
        }
      } else if (currentY > lastScrollY.current && !isHidden.current) {
        // Scrolling DOWN → hide
        gsap.to(nav, { y: "-100%", duration: 0.35, ease: "power2.in" });
        isHidden.current = true;
        setIsMobileMenuOpen(false); // close mobile menu on hide
      } else if (currentY < lastScrollY.current && isHidden.current) {
        // Scrolling UP → show
        gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.out" });
        isHidden.current = false;
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Smooth scroll on link click ──────────────────────
  // Navbar.jsx mein yeh function add karo (useEffect ke upar)
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xs"
    >

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            ref={logoRef}
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl shadow-black/60 flex items-center justify-center bg-black/80"
          >
            <img
              src={logo}
              alt="Luxe Salon"
              className="w-16 h-16 object-cover"
            />
          </div>
          <div>
            <h1
              className="text-3xl font-medium italic text-white tracking-tighter"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Floyd's Barber
            </h1>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)} // ← yeh add karo
              className="text-white hover:text-amber-400 text-[15px] font-medium tracking-wide transition-all duration-300 hover:scale-105"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Book Button */}
        <div className="hidden md:block">
          <button className="px-8 py-3.5 bg-white hover:bg-amber-950  hover:text-white rounded-full font-medium text-sm transition-all duration-300 hover:scale-105">
            BOOK APPOINTMENT
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 py-10">
          <div className="flex flex-col items-center gap-8 text-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)} // ← yeh add karo
                className="text-white hover:text-[#d4c4a8] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
            <button className="mt-6 px-12 py-4 bg-white text-black rounded-full font-medium">
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
