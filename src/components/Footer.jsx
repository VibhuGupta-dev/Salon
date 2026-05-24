import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = [
  { label: "Home",     href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery",  href: "#gallery" },
  { label: "Contact",  href: "#contact" },
];

const SERVICES = ["Cut & Finish", "Hair Colour", "Hair Texture", "Hair Treatments", "Beard Styling"];

const SOCIALS = [
  { name: "Instagram", href: "#" },
  { name: "Facebook",  href: "#" },
  { name: "WhatsApp",  href: "#" },
];

export default function Footer() {
  const footerRef  = useRef(null);
  const bigWordRef = useRef(null);
  const colsRef    = useRef(null);
  const bottomRef  = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Big word parallax
      gsap.to(bigWordRef.current, {
        y: -60, ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Columns stagger
      gsap.from(".footer-col", {
        y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: colsRef.current, start: "top 88%", once: true },
      });

      // Bottom bar
      gsap.from(bottomRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: bottomRef.current, start: "top 95%", once: true },
      });

      // Divider draw
      gsap.from(".footer-divider", {
        scaleX: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", transformOrigin: "left center",
        scrollTrigger: { trigger: colsRef.current, start: "top 85%", once: true },
      });

    }, footerRef);
    return () => ctx.revert();
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const linkStyle = {
    display: "block", fontSize: 13, color: "#7a5c44", textDecoration: "none",
    letterSpacing: "0.02em", marginBottom: "0.9rem", fontWeight: 300,
    fontFamily: "'Playfair Display',serif",
    transition: "color 0.25s ease, padding-left 0.3s ease",
  };

  return (
    <footer ref={footerRef}
      style={{ background: "#1e0d04", color: "#f5ede0", overflow: "hidden", position: "relative" }}
    >

      {/* ── BIG DECORATIVE WORD ───────────────────────────────── */}
      <div ref={bigWordRef} style={{
        position: "absolute", bottom: 60, left: "50%",
        transform: "translateX(-50%)", pointerEvents: "none",
        zIndex: 0, whiteSpace: "nowrap",
      }}>
        <span style={{
          fontFamily: "'Playfair Display',serif", fontStyle: "italic",
          fontSize: "clamp(5rem,14vw,12rem)", fontWeight: 300,
          color: "rgba(245,237,224,0.03)", letterSpacing: "-0.04em",
          lineHeight: 1, userSelect: "none",
        }}>
          Floyd's Barber
        </span>
      </div>

      {/* ── TOP HERO STRIP ───────────────────────────────────────── */}
      <div style={{
        borderBottom: "1px solid rgba(245,237,224,0.06)",
        padding: isMobile ? "3rem 1.25rem 2.5rem" : "5rem 2.5rem 4.5rem",
        maxWidth: 1200, margin: "0 auto",
        position: "relative", zIndex: 1,
        display: "flex", alignItems: isMobile ? "flex-start" : "flex-end",
        justifyContent: "space-between",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "1.75rem" : "2rem",
      }}>
        <div>
          <p style={{
            fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
            color: "rgba(212,196,168,0.4)", margin: "0 0 0.75rem",
          }}>
            Est. 2018 · Lucknow
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display',serif", fontStyle: "italic",
            fontSize: isMobile ? "clamp(2.4rem,11vw,3.2rem)" : "clamp(2.5rem,6vw,4.5rem)",
            fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, margin: 0, color: "#f5ede0",
          }}>
            Floyd's <span style={{ color: "#c9a87c" }}>Barber</span>
          </h2>
          <p style={{
            fontSize: 11, color: "rgba(245,237,224,0.3)", margin: "0.75rem 0 0",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Precision · Craft · Character
          </p>
        </div>

        <a href="#contact" onClick={e => smoothScroll(e, "#contact")}
          onMouseEnter={e => { e.currentTarget.style.background="#f5ede0"; e.currentTarget.style.color="#1e0d04"; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#c9a87c"; }}
          style={{
            padding: isMobile ? "0.85rem 2rem" : "0.9rem 2.2rem",
            border: "1px solid rgba(201,168,124,0.35)",
            color: "#c9a87c", fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", borderRadius: 999, textDecoration: "none",
            transition: "all 0.35s ease", background: "transparent",
            fontWeight: 500, alignSelf: "flex-start",
            // Full width on very small screens
            ...(isMobile && { textAlign: "center" }),
          }}>
          Book Appointment →
        </a>
      </div>

      {/* ── COLUMNS ──────────────────────────────────────────────── */}
      <div ref={colsRef} style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "2.5rem 1.25rem 3rem" : "4rem 2.5rem 4rem",
        display: "grid",
        // Mobile: 2 cols; tablet: 2x2; desktop: 4 cols
        gridTemplateColumns: isMobile ? "1fr 1fr" : "1.8fr 1fr 1fr 1.4fr",
        gap: isMobile ? "2rem 1.5rem" : "3rem",
        position: "relative", zIndex: 1,
      }}>

        {/* Col 1: About — full width on mobile */}
        <div className="footer-col" style={{
          gridColumn: isMobile ? "1 / -1" : "auto",
        }}>
          <div className="footer-divider" style={{ height: 1, background: "rgba(201,168,124,0.2)", marginBottom: "1.5rem" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,124,0.5)", marginBottom: "0.85rem" }}>About</p>
          <p style={{ fontSize: 13, color: "rgba(245,237,224,0.35)", lineHeight: 1.8, fontWeight: 300, letterSpacing: "0.02em", margin: "0 0 1.25rem", maxWidth: isMobile ? "100%" : "80%" }}>
            Floyd's Barber is Lucknow's finest grooming destination — where every visit is a ritual and every cut tells a story.
          </p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {SOCIALS.map(s => (
              <a key={s.name} href={s.href}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(201,168,124,0.6)"; e.currentTarget.style.color="#f5ede0"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(201,168,124,0.2)"; e.currentTarget.style.color="rgba(201,168,124,0.6)"; }}
                style={{
                  padding: "0.38rem 0.85rem", border: "1px solid rgba(201,168,124,0.2)",
                  color: "rgba(201,168,124,0.6)", fontSize: 9, letterSpacing: "0.2em",
                  textTransform: "uppercase", borderRadius: 999, textDecoration: "none",
                  transition: "all 0.3s ease",
                }}>
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="footer-col">
          <div className="footer-divider" style={{ height: 1, background: "rgba(201,168,124,0.2)", marginBottom: "1.5rem" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,124,0.5)", marginBottom: "1rem" }}>Navigate</p>
          {NAV.map(link => (
            <a key={link.label} href={link.href}
              onClick={e => smoothScroll(e, link.href)}
              onMouseEnter={e => { e.currentTarget.style.color="#c9a87c"; e.currentTarget.style.paddingLeft="6px"; }}
              onMouseLeave={e => { e.currentTarget.style.color="#7a5c44"; e.currentTarget.style.paddingLeft="0"; }}
              style={linkStyle}>
              {link.label}
            </a>
          ))}
        </div>

        {/* Col 3: Services */}
        <div className="footer-col">
          <div className="footer-divider" style={{ height: 1, background: "rgba(201,168,124,0.2)", marginBottom: "1.5rem" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,124,0.5)", marginBottom: "1rem" }}>Services</p>
          {SERVICES.map(s => (
            <a key={s} href="#services"
              onClick={e => smoothScroll(e, "#services")}
              onMouseEnter={e => { e.currentTarget.style.color="#c9a87c"; e.currentTarget.style.paddingLeft="6px"; }}
              onMouseLeave={e => { e.currentTarget.style.color="#7a5c44"; e.currentTarget.style.paddingLeft="0"; }}
              style={linkStyle}>
              {s}
            </a>
          ))}
        </div>

        {/* Col 4: Hours + Address — full width on mobile */}
        <div className="footer-col" style={{
          gridColumn: isMobile ? "1 / -1" : "auto",
        }}>
          <div className="footer-divider" style={{ height: 1, background: "rgba(201,168,124,0.2)", marginBottom: "1.5rem" }} />
          <p style={{ fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,124,0.5)", marginBottom: "1rem" }}>Visit Us</p>

          <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,124,0.4)", margin: "0 0 0.5rem" }}>Hours</p>
          {/* On mobile, show hours in a 2-col grid for compactness */}
          <div style={{
            display: isMobile ? "grid" : "block",
            gridTemplateColumns: isMobile ? "1fr 1fr" : undefined,
            gap: isMobile ? "0.4rem 1rem" : undefined,
          }}>
            {[["Mon – Fri", "9:00am – 7:00pm"], ["Saturday", "9:00am – 6:00pm"], ["Sunday", "Closed"]].map(([day, time]) => (
              <div key={day} style={{
                display: "flex", justifyContent: "space-between",
                marginBottom: isMobile ? "0" : "0.5rem", fontSize: 12,
              }}>
                <span style={{ color: "rgba(245,237,224,0.35)", fontFamily:"'Playfair Display',serif", fontWeight:300 }}>{day}</span>
                <span style={{ color: "rgba(245,237,224,0.55)", fontFamily:"'Playfair Display',serif", fontStyle:"italic" }}>{time}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,168,124,0.4)", margin: "0 0 0.4rem" }}>Address</p>
            <p style={{ fontSize: 12, color: "rgba(245,237,224,0.35)", lineHeight: 1.75, fontFamily:"'Playfair Display',serif", fontWeight:300, margin:0 }}>
              12, Hazratganj<br />Lucknow, Uttar Pradesh<br />226001
            </p>
          </div>
        </div>

      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────────── */}
      <div ref={bottomRef} style={{ borderTop: "1px solid rgba(245,237,224,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: isMobile ? "1.5rem 1.25rem" : "1.8rem 2.5rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "0.75rem" : "1rem",
          textAlign: isMobile ? "center" : "left",
        }}>
          <p style={{ fontSize: 10, color: "rgba(245,237,224,0.2)", margin: 0, letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Floyd's Barber. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: isMobile ? "1.25rem" : "2rem" }}>
            {["Privacy Policy", "Terms of Service"].map(t => (
              <a key={t} href="#"
                onMouseEnter={e => { e.currentTarget.style.color="rgba(201,168,124,0.7)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="rgba(245,237,224,0.2)"; }}
                style={{ fontSize: 10, color: "rgba(245,237,224,0.2)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.3s ease" }}>
                {t}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 10, color: "rgba(245,237,224,0.12)", margin: 0, fontFamily: "'Playfair Display',serif", fontStyle:"italic" }}>
            Crafted with care · Lucknow
          </p>
        </div>
      </div>

    </footer>
  );
}