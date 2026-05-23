import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Color palette
// BG:         #f5ede0  (warm beige)
// BG deep:    #ede3d4  (slightly darker beige for cards/CTA)
// Text:       #3b2212  (dark brown)
// Text muted: #7a5c44  (medium brown)
// Accent:     #6b3d1e  (deep warm brown — replaces beige accent)
// Rule:       rgba(107,61,30,0.18)

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80", chapter: "I",    label: "The Cut",     caption: "Where every line is intentional" },
  { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80", chapter: "II",   label: "The Craft",   caption: "Scissors that speak a language" },
  { src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&q=80", chapter: "III",  label: "The Man",     caption: "Confidence, shaped by hand" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80", chapter: "IV",   label: "The Ritual",  caption: "A shave is a rite of passage" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80", chapter: "V",    label: "The Detail",  caption: "Perfection lives in the edges" },
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80", chapter: "VI",   label: "The Chair",   caption: "Every seat holds a story" },
  { src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=800&q=80", chapter: "VII",  label: "The Fade",    caption: "Gradients that defy time" },
 
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(imgRef.current, { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" });
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(35,16,5,0.93)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        ref={imgRef}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "700px", width: "100%" }}
      >
        {/* corner accents */}
        <div style={{ position: "absolute", top: -8, left: -8, width: 24, height: 1, background: "#c9a87c" }} />
        <div style={{ position: "absolute", top: -8, left: -8, width: 1, height: 24, background: "#c9a87c" }} />
        <div style={{ position: "absolute", bottom: -8, right: -8, width: 24, height: 1, background: "#c9a87c" }} />
        <div style={{ position: "absolute", bottom: -8, right: -8, width: 1, height: 24, background: "#c9a87c" }} />

        <img
          src={item.src}
          alt={item.label}
          style={{ width: "100%", borderRadius: 4, display: "block", maxHeight: "80vh", objectFit: "cover" }}
        />
        <div style={{ padding: "1.2rem 0 0" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(201,168,124,0.55)", fontFamily: "'Playfair Display',serif" }}>
            Chapter {item.chapter}
          </span>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 300, color: "#f5ede0", margin: "4px 0 2px", letterSpacing: "-0.02em" }}>
            {item.label}
          </p>
          <p style={{ fontSize: 12, color: "rgba(245,237,224,0.45)", letterSpacing: "0.06em" }}>{item.caption}</p>
        </div>

        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: 12, right: 12,
            background: "rgba(35,16,5,0.7)", border: "1px solid rgba(201,168,124,0.25)",
            color: "#c9a87c", borderRadius: "50%", width: 36, height: 36,
            cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Close"
        >✕</button>
      </div>
    </div>
  );
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const stripRef   = useRef(null);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [hoveredIdx, setHoveredIdx]     = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(headerRef.current, {
        y: 70, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });

      gsap.from(stripRef.current, {
        scaleX: 0, duration: 1.4, ease: "power3.out", transformOrigin: "left center",
        scrollTrigger: { trigger: stripRef.current, start: "top 85%", once: true },
      });

      gsap.from(".gal-card", {
        y: 80, opacity: 0, duration: 0.9, stagger: { each: 0.1, from: "start" }, ease: "power3.out",
        scrollTrigger: { trigger: ".gal-grid", start: "top 75%", once: true },
      });

      gsap.utils.toArray(".chap-num").forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      style={{ background: "#f5ede0", color: "#3b2212", overflow: "hidden" }}
    >
      {/* ── Top rule ──────────────────────────────────────────────────────── */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(107,61,30,0.25), transparent)" }} />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div ref={headerRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2.5rem 3.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <p style={{
            fontSize: 10, letterSpacing: "0.45em", textTransform: "uppercase",
            color: "#9c6f50", margin: 0,
          }}>
            A Visual Chronicle
          </p>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 5.5rem)",
              fontWeight: 300, letterSpacing: "-0.03em",
              lineHeight: 1, margin: 0, color: "#3b2212",
            }}>
              Stories <em style={{ color: "#6b3d1e", fontStyle: "italic" }}>Told</em>
              <br />in Cuts
            </h2>

            <p style={{
              fontSize: 13, color: "#7a5c44",
              maxWidth: 220, lineHeight: 1.7, textAlign: "right",
              letterSpacing: "0.03em", margin: 0,
            }}>
              Eight chapters. Eight moments. Each frame a testament to the art that lives in this chair.
            </p>
          </div>
        </div>

        {/* Animated rule */}
        <div ref={stripRef} style={{
          marginTop: "2.5rem", height: 1,
          background: "linear-gradient(90deg, rgba(107,61,30,0.4) 0%, rgba(107,61,30,0.1) 60%, transparent 100%)",
        }} />
      </div>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div
        className="gal-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2.5rem 5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gridAutoRows: "280px",
          gap: "1.5rem",
        }}
      >
        {IMAGES.map((item, i) => {
          const isTall = i === 0 || i === 5;
          return (
            <div
              key={item.chapter}
              className="gal-card"
              onClick={() => setLightboxItem(item)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                gridRow: isTall ? "span 2" : "span 1",
                position: "relative",
                borderRadius: 6,
                overflow: "hidden",
                cursor: "pointer",
                background: "#d9c9b4",
                border: "1px solid rgba(107,61,30,0.12)",
              }}
            >
              {/* Image */}
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  display: "block",
                  transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease",
                  transform: hoveredIdx === i ? "scale(1.06)" : "scale(1)",
                  filter: hoveredIdx === i ? "brightness(0.5) sepia(0.2)" : "brightness(0.72) sepia(0.1)",
                }}
              />

              {/* Gradient overlay — brown tinted */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(35,14,4,0.85) 0%, rgba(35,14,4,0.12) 55%, transparent 100%)",
              }} />

              {/* Chapter number watermark */}
              <div
                className="chap-num"
                style={{
                  position: "absolute", top: 14, right: 16,
                  fontFamily: "'Playfair Display',serif",
                  fontSize: isTall ? 64 : 48,
                  fontWeight: 300,
                  color: hoveredIdx === i ? "rgba(245,237,224,0.13)" : "rgba(245,237,224,0.07)",
                  lineHeight: 1, userSelect: "none",
                  transition: "color 0.4s ease",
                }}
              >
                {item.chapter}
              </div>

              {/* Corner accents */}
              <div style={{ position: "absolute", top: 10, left: 10, width: hoveredIdx === i ? 32 : 16, height: 1, background: "rgba(245,237,224,0.45)", transition: "width 0.4s ease" }} />
              <div style={{ position: "absolute", top: 10, left: 10, width: 1, height: hoveredIdx === i ? 32 : 16, background: "rgba(245,237,224,0.45)", transition: "height 0.4s ease" }} />

              {/* Bottom text */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.2rem 1.2rem 1rem" }}>
                <div style={{
                  height: 1,
                  background: "rgba(245,237,224,0.3)",
                  marginBottom: 10,
                  width: hoveredIdx === i ? "40%" : "20%",
                  transition: "width 0.4s ease",
                }} />
                <p style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: isTall ? 22 : 17,
                  fontWeight: 300, letterSpacing: "-0.01em",
                  color: "#f5ede0", margin: "0 0 4px",
                  transform: hoveredIdx === i ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.4s ease",
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontSize: 10, letterSpacing: "0.08em",
                  color: "rgba(245,237,224,0.5)",
                  margin: 0,
                  opacity: hoveredIdx === i ? 1 : 0.6,
                  transition: "opacity 0.4s ease",
                }}>
                  {item.caption}
                </p>
              </div>

              {/* Hover zoom ring */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: hoveredIdx === i ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}>
                <div style={{
                  border: "1px solid rgba(245,237,224,0.5)",
                  borderRadius: "50%", width: 52, height: 52,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, color: "rgba(245,237,224,0.9)",
                }}>
                  ⊕
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </section>
  );
}