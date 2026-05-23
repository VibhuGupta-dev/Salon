// src/components/BeamsBackground.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function BeamsBackground({ 
  className = "", 
  intensity = "strong" 
}) {
  const canvasRef = useRef(null);
  const beamsRef = useRef([]);
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const beams = [];
    for (let i = 0; i < 25; i++) {
      beams.push({
        x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
        y: Math.random() * canvas.height * 1.5 - canvas.height * 0.25,
        width: 40 + Math.random() * 80,
        length: canvas.height * 2.8,
        angle: -35 + Math.random() * 12,
        speed: 0.7 + Math.random() * 1.1,
        opacity: 0.08 + Math.random() * 0.15,
        hue: 200 + Math.random() * 60,
      });
    }
    beamsRef.current = beams;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(40px)";

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed;

        if (beam.y + beam.length < -200) {
          beam.y = canvas.height + 100;
          beam.x = Math.random() * canvas.width * 1.5 - canvas.width * 0.25;
        }

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
        grad.addColorStop(0, `hsla(${beam.hue}, 90%, 70%, 0)`);
        grad.addColorStop(0.3, `hsla(${beam.hue}, 90%, 70%, ${beam.opacity})`);
        grad.addColorStop(0.7, `hsla(${beam.hue}, 90%, 70%, ${beam.opacity})`);
        grad.addColorStop(1, `hsla(${beam.hue}, 90%, 70%, 0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-neutral-950 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      <motion.div
        className="absolute inset-0 bg-black/40"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}