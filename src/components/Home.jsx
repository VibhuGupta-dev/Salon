import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const eyebrowRef  = useRef(null);
  const headingRef  = useRef(null);
  const ruleRef     = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef  = useRef(null);
  const scrollRef   = useRef(null);

  useEffect(() => {
    // Safety check — agar koi bhi ref null hai toh early return
    if (
      !eyebrowRef.current ||
      !headingRef.current ||
      !ruleRef.current ||
      !subtitleRef.current ||
      !buttonsRef.current ||
      !scrollRef.current
    ) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // staggered cinematic entrance
    tl.fromTo(eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.9 })
      .fromTo('.home-word',
        { y: 80, opacity: 0, rotateX: -40 },
        { y: 0,  opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.08,
          transformOrigin: 'top center' },
        '-=0.5')
      .fromTo(ruleRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: 'expo.out',
          transformOrigin: 'center center' },
        '-=0.6')
      .fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.8 },
        '-=0.5')
      .fromTo(Array.from(buttonsRef.current.children),
        { y: 20, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.7, stagger: 0.1 },
        '-=0.5')
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.3');

    // subtle looping scroll indicator pulse
    gsap.to('.scroll-line', {
      scaleY: 0.4, opacity: 0, duration: 1.2,
      ease: 'power1.inOut', repeat: -1, yoyo: true,
      transformOrigin: 'top center', delay: 1.5,
    });

    // Cleanup on unmount
    return () => {
      tl.kill();
      gsap.killTweensOf('.scroll-line');
    };
  }, []);

  return (
    <section id="home"
      style={{ position: 'relative', minHeight: '100vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden' }}>

      {/* ── Video Background ─────────────────────────────────────── */}
      <video
        autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', zIndex: 0 }}
      >
        {/*
          Replace this src with your local import:
            import video from "../assets/video1.mp4";
            <source src={video} type="video/mp4" />

          Cloudinary direct URL format (not the embed URL):
            https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/YOUR_PUBLIC_ID.mp4
        */}
        <source
          src="https://res.cloudinary.com/domylmj7e/video/upload/video1_fpj14u.mp4"
          type="video/mp4"
        />
      </video>

      {/* ── Overlay ──────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.7) 100%)' }} />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center',
                    padding: '0 1.5rem', maxWidth: 900, margin: '0 auto' }}>

        {/* Eyebrow */}
        <p ref={eyebrowRef}
          style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase',
                    color: 'rgba(201,184,152,0.7)', margin: '0 0 2rem' }}>
          Excellence in Every Detail
        </p>

        {/* Heading — word split for GSAP */}
        <div ref={headingRef} className="overflow-hidden">
  <h1 
    className="font-playfair font-light text-white text-center
               text-[clamp(2.5rem,7vw,7rem)] 
               tracking-[-0.04em] leading-[0.95]
               whitespace-nowrap"
  >
    {'Elegance\u00A0'.split('').map((c, i) => (
      <span key={`e${i}`} className="home-word inline-block">
        {c}
      </span>
    ))}
    <em 
      className="text-[#d4c4a8] italic font-light inline"
    >
      {'Redefined'.split('').map((c, i) => (
        <span key={`r${i}`} className="home-word inline-block">
          {c}
        </span>
      ))}
    </em>
  </h1>
</div>

        {/* Beige rule */}
        <div ref={ruleRef}
          style={{ width: 60, height: 1, background: 'rgba(201,184,152,0.45)',
                    margin: '2rem auto' }} />

        {/* Subtitle */}
        <p ref={subtitleRef}
          style={{ fontSize: 'clamp(0.8rem,1.5vw,1rem)', color: 'rgba(255,255,255,0.45)',
                    margin: '0 0 2.5rem', maxWidth: 380, marginLeft: 'auto',
                    marginRight: 'auto', lineHeight: 1.8, letterSpacing: '0.04em' }}>
          Experience luxury grooming and beauty services tailored just for you.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
                    justifyContent: 'center' }}>
          <a href="#services"
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#d4c4a8'; e.currentTarget.style.color = '#000'; }}
            style={{ padding: '0.9rem 2.5rem', background: '#d4c4a8', color: '#000',
                      fontWeight: 500, fontSize: 11, letterSpacing: '0.15em',
                      textTransform: 'uppercase', borderRadius: 999, textDecoration: 'none',
                      transition: 'background 0.3s ease, color 0.3s ease' }}>
            Explore Services
          </a>
          <a href="#contact"
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            style={{ padding: '0.9rem 2.5rem', border: '1px solid rgba(201,184,152,0.28)',
                      color: '#c9b898', fontWeight: 300, fontSize: 11, letterSpacing: '0.15em',
                      textTransform: 'uppercase', borderRadius: 999, textDecoration: 'none',
                      transition: 'background 0.3s ease', background: 'transparent' }}>
            Book Appointment
          </a>
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────── */}
      <div ref={scrollRef}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 8, zIndex: 2 }}>
        <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase',
                     color: 'rgba(255,255,255,0.22)', margin: 0 }}>
          Scroll to Discover
        </p>
        <div className="scroll-line"
          style={{ width: 1, height: 48,
                    background: 'linear-gradient(to bottom, rgba(201,184,152,0.4), transparent)' }} />
      </div>

    </section>
  );
}