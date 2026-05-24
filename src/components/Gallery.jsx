import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80", chapter: "I",   label: "The Cut",    caption: "Where every line is intentional" },
  { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80", chapter: "II",  label: "The Craft",  caption: "Scissors that speak a language" },
  { src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&q=80", chapter: "III", label: "The Man",    caption: "Confidence, shaped by hand" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80", chapter: "IV",  label: "The Ritual", caption: "A shave is a rite of passage" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80", chapter: "V",   label: "The Detail", caption: "Perfection lives in the edges" },
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80", chapter: "VI",  label: "The Chair",  caption: "Every seat holds a story" },
  { src: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=800&q=80", chapter: "VII", label: "The Fade",   caption: "Gradients that defy time" },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  const overlayRef = useRef(null);
  const boxRef     = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(boxRef.current,
      { scale: 0.84, opacity: 0, y: 28 },
      { scale: 1, opacity: 1, y: 0, duration: 0.52, ease: "back.out(1.6)" }
    );
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () =>
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.22, ease: "power2.in", onComplete: onClose });

  return (
    <div ref={overlayRef} onClick={close}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(18,6,1,0.97)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <div ref={boxRef} onClick={e => e.stopPropagation()}
        style={{ position: "relative", maxWidth: 680, width: "100%" }}
      >
        {/* corner accents */}
        {[[{top:-10,left:-10,width:28,height:1},{top:-10,left:-10,width:1,height:28}],
           [{bottom:-10,right:-10,width:28,height:1},{bottom:-10,right:-10,width:1,height:28}]
        ].flat().map((s, i) => (
          <div key={i} style={{ position:"absolute", background:"#c9a87c", ...s }} />
        ))}
        <img src={item.src} alt={item.label}
          style={{ width:"100%", borderRadius:6, display:"block", maxHeight:"72vh", objectFit:"cover" }}
        />
        <div style={{ padding: "1rem 0 0" }}>
          <span style={{ fontSize:10, letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(201,168,124,0.55)", fontFamily:"'Playfair Display',serif" }}>
            Chapter {item.chapter}
          </span>
          <p style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:300, color:"#f5ede0", margin:"4px 0 2px", letterSpacing:"-0.02em" }}>
            {item.label}
          </p>
          <p style={{ fontSize:12, color:"rgba(245,237,224,0.45)", letterSpacing:"0.06em", margin:0 }}>
            {item.caption}
          </p>
        </div>
        <button onClick={close} aria-label="Close"
          style={{
            position:"absolute", top:10, right:10,
            background:"rgba(18,6,1,0.8)", border:"1px solid rgba(201,168,124,0.3)",
            color:"#c9a87c", borderRadius:"50%", width:38, height:38,
            cursor:"pointer", fontSize:16,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}
        >✕</button>
      </div>
    </div>
  );
}

// ─── Mobile: Cinematic Horizontal Scroll Deck ─────────────────────────────────
function MobileDeck({ onOpen }) {
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    gsap.fromTo(".mob-card",
      { x: 55, opacity: 0, rotate: 3 },
      { x: 0, opacity: 1, rotate: 0, duration: 0.65, stagger: 0.09, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  const handleTap = (i, item) => {
    if (revealed[i]) {
      onOpen(item);
    } else {
      setRevealed(r => ({ ...r, [i]: true }));
      // small bounce feedback
      const el = document.querySelector(`.mob-card-${i}`);
      if (el) gsap.fromTo(el, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
    }
  };

  return (
    <div>
      {/* "swipe" hint bar */}
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0 1.25rem 0.85rem" }}>
        <div style={{ flex:1, height:1, background:"rgba(107,61,30,0.18)" }} />
        <p style={{ fontSize:9, letterSpacing:"0.38em", textTransform:"uppercase", color:"rgba(107,61,30,0.4)", margin:0 }}>
          tap to reveal · swipe
        </p>
        <div style={{ flex:1, height:1, background:"rgba(107,61,30,0.18)" }} />
      </div>

      {/* Scroll track */}
      <div style={{
        display: "flex", gap: "0.7rem",
        overflowX: "auto", overflowY: "hidden",
        padding: "0.25rem 1.25rem 1rem",
        scrollSnapType: "x mandatory",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
      }}>
        {IMAGES.map((item, i) => {
          const isRev = !!revealed[i];
          return (
            <div
              key={item.chapter}
              className={`mob-card mob-card-${i}`}
              onClick={() => handleTap(i, item)}
              style={{
                flexShrink: 0,
                width: isRev ? "72vw" : "56vw",
                maxWidth: isRev ? 300 : 240,
                height: isRev ? "88vw" : "72vw",
                maxHeight: isRev ? 370 : 290,
                scrollSnapAlign: "start",
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                transition: "width 0.55s cubic-bezier(0.34,1.4,0.64,1), height 0.55s cubic-bezier(0.34,1.4,0.64,1)",
                border: isRev ? "1px solid rgba(107,61,30,0.4)" : "1px solid rgba(107,61,30,0.1)",
                boxShadow: isRev
                  ? "0 24px 60px rgba(35,14,4,0.3), 0 4px 16px rgba(35,14,4,0.15)"
                  : "0 4px 18px rgba(35,14,4,0.1)",
              }}
            >
              {/* photo */}
              <img src={item.src} alt={item.label} loading="lazy"
                style={{
                  width:"100%", height:"100%", objectFit:"cover", display:"block",
                  transition: "transform 0.65s ease, filter 0.5s ease",
                  transform: isRev ? "scale(1.06)" : "scale(1)",
                  filter: isRev ? "brightness(0.42) sepia(0.18)" : "brightness(0.78) sepia(0.06)",
                }}
              />

              {/* gradient vignette */}
              <div style={{
                position:"absolute", inset:0,
                background: "linear-gradient(to top, rgba(22,8,2,0.95) 0%, rgba(22,8,2,0.08) 48%, transparent 100%)",
              }} />

              {/* top-left chapter + accent lines */}
              <div style={{
                position:"absolute", top:13, left:13,
                display:"flex", flexDirection:"column", gap:4,
              }}>
                <div style={{
                  width: isRev ? 22 : 10, height:1,
                  background:"rgba(201,168,124,0.65)",
                  transition:"width 0.45s ease",
                }} />
                <span style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:10, letterSpacing:"0.35em", textTransform:"uppercase",
                  color: isRev ? "rgba(201,168,124,0.9)" : "rgba(245,237,224,0.35)",
                  transition:"color 0.4s ease",
                }}>
                  {item.chapter}
                </span>
              </div>

              {/* bottom info — slides up */}
              <div style={{
                position:"absolute", bottom:0, left:0, right:0,
                padding:"0.9rem 1rem 0.85rem",
                transform: isRev ? "translateY(0)" : "translateY(14px)",
                opacity: isRev ? 1 : 0,
                transition: "transform 0.48s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease",
              }}>
                <div style={{ width:24, height:1, background:"rgba(201,168,124,0.5)", marginBottom:7 }} />
                <p style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:19, fontWeight:300, letterSpacing:"-0.01em",
                  color:"#f5ede0", margin:"0 0 3px",
                }}>
                  {item.label}
                </p>
                <p style={{ fontSize:10, letterSpacing:"0.07em", color:"rgba(245,237,224,0.48)", margin:"0 0 11px" }}>
                  {item.caption}
                </p>
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:5,
                  fontSize:9, letterSpacing:"0.28em", textTransform:"uppercase",
                  color:"#c9a87c", borderBottom:"1px solid rgba(201,168,124,0.3)",
                  paddingBottom:2,
                }}>
                  View Full <span style={{ fontSize:11 }}>→</span>
                </div>
              </div>

              {/* "+" tap hint ring — hidden after reveal */}
              <div style={{
                position:"absolute", inset:0,
                display:"flex", alignItems:"center", justifyContent:"center",
                opacity: isRev ? 0 : 1,
                transition:"opacity 0.28s ease",
                pointerEvents:"none",
              }}>
                <div style={{
                  border:"1px solid rgba(245,237,224,0.38)",
                  borderRadius:"50%", width:46, height:46,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:20, color:"rgba(245,237,224,0.65)",
                  backdropFilter:"blur(4px)",
                }}>
                  +
                </div>
              </div>
            </div>
          );
        })}
        {/* end spacer */}
        <div style={{ flexShrink:0, width:"0.75rem" }} />
      </div>

      {/* progress pills */}
      <div style={{ display:"flex", justifyContent:"center", gap:5, padding:"0.5rem 0 0.25rem" }}>
        {IMAGES.map((_, i) => (
          <div key={i} style={{
            width: revealed[i] ? 20 : 5, height:5, borderRadius:99,
            background: revealed[i] ? "#6b3d1e" : "rgba(107,61,30,0.22)",
            transition:"all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
          }} />
        ))}
      </div>

      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

// ─── Desktop Grid Card ────────────────────────────────────────────────────────
function DesktopCard({ item, isTall, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="gal-card"
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridRow: isTall ? "span 2" : "span 1",
        position:"relative", borderRadius:6, overflow:"hidden",
        cursor:"pointer", background:"#d9c9b4",
        border:"1px solid rgba(107,61,30,0.12)",
      }}
    >
      <img src={item.src} alt={item.label} loading="lazy"
        style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          transition:"transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease",
          transform: hov ? "scale(1.06)" : "scale(1)",
          filter: hov ? "brightness(0.5) sepia(0.2)" : "brightness(0.72) sepia(0.1)",
        }}
      />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(35,14,4,0.85) 0%,rgba(35,14,4,0.12) 55%,transparent 100%)" }} />
      <div className="chap-num" style={{
        position:"absolute", top:14, right:16,
        fontFamily:"'Playfair Display',serif", fontSize: isTall?64:48, fontWeight:300,
        color: hov?"rgba(245,237,224,0.13)":"rgba(245,237,224,0.07)",
        lineHeight:1, userSelect:"none", transition:"color 0.4s ease",
      }}>{item.chapter}</div>
      <div style={{ position:"absolute", top:10, left:10, width: hov?32:16, height:1, background:"rgba(245,237,224,0.45)", transition:"width 0.4s ease" }} />
      <div style={{ position:"absolute", top:10, left:10, width:1, height: hov?32:16, background:"rgba(245,237,224,0.45)", transition:"height 0.4s ease" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.2rem 1.2rem 1rem" }}>
        <div style={{ height:1, background:"rgba(245,237,224,0.3)", marginBottom:10, width: hov?"40%":"20%", transition:"width 0.4s ease" }} />
        <p style={{
          fontFamily:"'Playfair Display',serif", fontSize: isTall?22:17, fontWeight:300,
          letterSpacing:"-0.01em", color:"#f5ede0", margin:"0 0 4px",
          transform: hov?"translateY(-2px)":"translateY(0)", transition:"transform 0.4s ease",
        }}>{item.label}</p>
        <p style={{ fontSize:10, letterSpacing:"0.08em", color:"rgba(245,237,224,0.5)", margin:0, opacity: hov?1:0.6, transition:"opacity 0.4s ease" }}>
          {item.caption}
        </p>
      </div>
      <div style={{
        position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
        opacity: hov?1:0, transition:"opacity 0.35s ease",
      }}>
        <div style={{
          border:"1px solid rgba(245,237,224,0.5)", borderRadius:"50%", width:52, height:52,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, color:"rgba(245,237,224,0.9)",
        }}>⊕</div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const stripRef   = useRef(null);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      if (!isMobile) {
        gsap.from(".gal-card", {
          y: 80, opacity: 0, duration: 0.9, stagger: { each: 0.1 }, ease: "power3.out",
          scrollTrigger: { trigger: ".gal-grid", start: "top 75%", once: true },
        });
        gsap.utils.toArray(".chap-num").forEach(el => {
          gsap.from(el, {
            y: 30, opacity: 0, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="gallery"
      style={{ background: "#f5ede0", color: "#3b2212", overflow: "hidden" }}
    >
      <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(107,61,30,0.25),transparent)" }} />

      {/* ── Header ──────────────────────────────────────────────── */}
      <div ref={headerRef}
        style={{ maxWidth:1200, margin:"0 auto", padding: isMobile ? "3.5rem 1.25rem 2rem" : "6rem 2.5rem 3.5rem" }}
      >
        <p style={{ fontSize:10, letterSpacing:"0.45em", textTransform:"uppercase", color:"#9c6f50", margin:"0 0 1rem" }}>
          A Visual Chronicle
        </p>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"1.5rem", flexWrap:"wrap" }}>
          <h2 style={{
            fontFamily:"'Playfair Display', serif",
            fontSize: isMobile ? "clamp(2.8rem,11vw,3.6rem)" : "clamp(3rem,8vw,5.5rem)",
            fontWeight:300, letterSpacing:"-0.03em", lineHeight:1, margin:0, color:"#3b2212",
          }}>
            Stories <em style={{ color:"#6b3d1e", fontStyle:"italic" }}>Told</em>
            <br/>in Cuts
          </h2>
          {!isMobile && (
            <p style={{ fontSize:13, color:"#7a5c44", maxWidth:220, lineHeight:1.7, textAlign:"right", letterSpacing:"0.03em", margin:0 }}>
              Eight chapters. Eight moments. Each frame a testament to the art that lives in this chair.
            </p>
          )}
        </div>
        {isMobile && (
          <p style={{ fontSize:12, color:"#7a5c44", lineHeight:1.75, letterSpacing:"0.03em", margin:"0.75rem 0 0" }}>
            Eight chapters. Eight moments.<br/>Each frame, a testament.
          </p>
        )}
        <div ref={stripRef} style={{
          marginTop: isMobile ? "1.5rem" : "2.5rem", height:1,
          background:"linear-gradient(90deg,rgba(107,61,30,0.4) 0%,rgba(107,61,30,0.1) 60%,transparent 100%)",
        }} />
      </div>

      {/* ── Mobile Deck ─────────────────────────────────────────── */}
      {isMobile && (
        <div style={{ paddingBottom:"3.5rem" }}>
          <MobileDeck onOpen={setLightboxItem} />
        </div>
      )}

      {/* ── Desktop Grid ─────────────────────────────────────────── */}
      {!isMobile && (
        <div className="gal-grid" style={{
          maxWidth:1200, margin:"0 auto", padding:"0 2.5rem 5rem",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",
          gridAutoRows:"280px", gap:"1.5rem",
        }}>
          {IMAGES.map((item, i) => (
            <DesktopCard key={item.chapter} item={item} isTall={i===0||i===5} onOpen={setLightboxItem} />
          ))}
        </div>
      )}

      {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
    </section>
  );
}