// src/components/Home.jsx
import React from 'react';
import video from "../assets/video1.mp4";

export default function Home() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Video Background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Eyebrow — same as Service */}
        <p className="text-[11px] tracking-[0.4em] uppercase text-[#c9b898]/70 mb-6">
          Excellence in Every Detail
        </p>

        {/* Heading — same font, same weight as Service */}
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none text-white mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Elegance <em className="italic text-[#d4c4a8]">Redefined</em>
        </h1>

        {/* Thin beige rule — same as Service */}
        <div className="mx-auto mb-8 h-px w-16 bg-[#c9b898]/40" />

        {/* Subtitle — same size/weight as Service description */}
        <p className="text-sm md:text-base text-white/50 mb-10 max-w-md mx-auto leading-relaxed tracking-wide">
          Experience luxury grooming and beauty services tailored just for you.
        </p>

        {/* Buttons — same style as Service CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#services"
            className="px-10 py-3.5 bg-[#d4c4a8] text-black font-medium rounded-full hover:bg-white transition-colors duration-300 text-sm tracking-wide"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="px-10 py-3.5 border border-[#c9b898]/25 text-[#c9b898] font-light rounded-full hover:bg-white/5 transition-colors duration-300 text-sm tracking-wide"
          >
            Book Appointment
          </a>
        </div>
      </div>

      {/* Scroll Indicator — same muted style */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-[10px] tracking-[0.35em] uppercase text-white/25">Scroll to Discover</p>
        <div className="w-px h-12 bg-gradient-to-b from-[#c9b898]/30 to-transparent" />
      </div>

    </section>
  );
}