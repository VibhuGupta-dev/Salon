import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cutImg from '../assets/cut.jpg';
import colourImg from '../assets/color.jpg';
import textureImg from '../assets/texture.jpg';
import treatImg from '../assets/treatement.jpg';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'cut',
    number: '01',
    title: 'Cut & Finish',
    tagline: 'Precision meets elegance',
    image: cutImg,
    items: ['Cut and Hair Care', 'Shampoo & Conditioning', 'Head Massage', 'Beard Styling'],
  },
  {
    id: 'colour',
    number: '02',
    title: 'Hair Colour',
    tagline: 'Artistry in every strand',
    image: colourImg,
    items: ['Ammonia & Ammonia Free', 'Hi-Lites', 'Beard Colour'],
  },
  {
    id: 'texture',
    number: '03',
    title: 'Hair Texture',
    tagline: 'Transform your texture',
    image: textureImg,
    items: ['Straightening', 'Smoothening', 'Rebonding', 'Perming'],
  },
  {
    id: 'treatment',
    number: '04',
    title: 'Hair Treatments',
    tagline: 'Deep restoration & care',
    image: treatImg,
    items: ['Hair Spa', 'Advanced Moisturising', 'Scalp Treatments', 'Colour Protection'],
  },
];

export default function Service() {
  const [active, setActive]               = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const imageRef   = useRef(null);
  const listRef    = useRef(null);
  const videoRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
      });
      gsap.from('.srv-row', {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 75%', once: true },
      });
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          x: 60, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 75%', once: true },
        });
      }
      gsap.from(videoRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: videoRef.current, start: 'top 80%', once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleServiceChange = (i) => {
    if (i === active || transitioning) return;
    setTransitioning(true);

    // On mobile, imageRef may not exist (hidden), so guard
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0, scale: 1.04, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          setActive(i);
          gsap.to(imageRef.current, {
            opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out',
            onComplete: () => setTransitioning(false),
          });
        },
      });
    } else {
      setActive(i);
      setTimeout(() => setTransitioning(false), 300);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-[#0a0a0a] text-white overflow-hidden"
    >

      {/* ── Header ──────────────────────────────────── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-5 md:px-12 pt-20 md:pt-28 pb-10 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div>
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#c9b898]/70 mb-4 md:mb-5">
              Excellence in Every Detail
            </p>
            <h2
              className="text-4xl md:text-7xl font-light tracking-tighter leading-none text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our <em className="italic text-[#d4c4a8]">Services</em>
            </h2>
          </div>
          <p className="text-white/40 text-xs md:text-sm max-w-xs leading-relaxed md:text-right">
            Where tradition meets modern luxury — every service is a curated experience.
          </p>
        </div>
        <div className="mt-8 md:mt-12 h-px bg-gradient-to-r from-[#c9b898]/40 via-[#c9b898]/10 to-transparent" />
      </div>

      {/* ── Main: List + Image ──────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">

        {/* Left: Service Rows */}
        <div ref={listRef} className="divide-y divide-white/[0.07]">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className="srv-row group cursor-pointer py-6 md:py-8 flex items-start justify-between gap-4 md:gap-6"
              onClick={() => handleServiceChange(i)}
            >
              <div className="flex items-start gap-4 md:gap-6 flex-1">
                <span className="text-[10px] md:text-[11px] tracking-widest text-[#c9b898]/25 mt-1.5 font-light w-5 md:w-6 flex-shrink-0">
                  {svc.number}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-2xl md:text-4xl font-light tracking-tight leading-none transition-colors duration-300"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: active === i ? '#d4c4a8' : 'rgba(255,255,255,0.80)',
                      }}
                    >
                      {svc.title}
                    </h3>
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#c9b898] flex-shrink-0 transition-opacity duration-300"
                      style={{ opacity: active === i ? 1 : 0 }}
                    />
                  </div>
                  <p className="text-white/30 text-[11px] md:text-xs tracking-wider mt-1.5">{svc.tagline}</p>

                  {/* Mobile: show image inside accordion when active */}
                  <div
                    className="block lg:hidden overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: active === i ? '260px' : '0px', opacity: active === i ? 1 : 0 }}
                  >
                    <div className="relative mt-5 rounded-xl overflow-hidden aspect-[16/9]">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white text-base font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {svc.title}
                        </p>
                        <p className="text-[#c9b898]/70 text-[10px] tracking-wider mt-0.5">{svc.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items list */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: active === i ? '200px' : '0px', opacity: active === i ? 1 : 0 }}
                  >
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
                      {svc.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs md:text-sm text-white/45 font-light">
                          <span className="w-3 h-px bg-[#c9b898]/40 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 mt-5 text-[11px] tracking-[0.22em] uppercase text-[#c9b898] hover:text-white transition-colors duration-300"
                    >
                      Book this service <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Plus / close icon */}
              <span
                className="text-xl md:text-2xl font-extralight flex-shrink-0 mt-1 transition-all duration-300"
                style={{
                  color: active === i ? '#d4c4a8' : 'rgba(255,255,255,0.15)',
                  transform: active === i ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              >
                +
              </span>
            </div>
          ))}
        </div>

        {/* Right: Sticky Image — desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden will-change-transform"
            >
              <img
                src={services[active].image}
                alt={services[active].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="h-px bg-[#c9b898]/50 mb-4 w-10" />
                <p className="text-white text-xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {services[active].title}
                </p>
                <p className="text-[#c9b898]/70 text-xs tracking-wider mt-1">
                  {services[active].tagline}
                </p>
              </div>
              <div
                className="absolute top-5 right-5 text-[72px] font-light text-white/5 leading-none select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {services[active].number}
              </div>
              <div className="absolute top-0 left-0 w-12 h-px bg-[#c9b898]/30" />
              <div className="absolute top-0 left-0 w-px h-12 bg-[#c9b898]/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Video ──────────────────────────────────── */}
      <div ref={videoRef} className="max-w-7xl mx-auto px-5 md:px-12 pb-20 md:pb-28">
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-video will-change-transform">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/domylmj7e/video/upload/video2_swbcwm.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-5 left-5 md:bottom-12 md:left-12">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#c9b898]/80 mb-2 md:mb-3">
              The art of transformation
            </p>
            <p
              className="text-2xl md:text-4xl font-light text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Every cut <br />
              <em className="italic text-[#c9b898]/70">tells a story</em>
            </p>
          </div>

          <div className="absolute top-4 right-4 md:top-6 md:right-6 border border-[#c9b898]/20 rounded-full px-3 py-1 md:px-4 md:py-1.5">
            <p className="text-[9px] md:text-[10px] tracking-widest uppercase text-[#c9b898]/40">Behind the craft</p>
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 md:px-12 py-10 md:py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p
            className="text-xl md:text-3xl font-light text-white/70 tracking-tight text-center sm:text-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready for your{' '}
            <em className="italic text-[#d4c4a8]">transformation?</em>
          </p>
          <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
            <a
              href="#contact"
              className="flex-1 sm:flex-none text-center px-6 md:px-8 py-3 md:py-3.5 bg-[#d4c4a8] text-black font-medium rounded-full text-xs md:text-sm tracking-wide transition-colors duration-300 hover:bg-white"
            >
              Book Appointment
            </a>
            <a
              href="#contact"
              className="flex-1 sm:flex-none text-center px-6 md:px-8 py-3 md:py-3.5 border border-[#c9b898]/25 text-[#c9b898] font-light rounded-full text-xs md:text-sm tracking-wide transition-colors duration-300 hover:bg-white/5"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}