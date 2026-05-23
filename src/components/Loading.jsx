import React, { useEffect, useState } from 'react';

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showFinalAnim, setShowFinalAnim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 5 + 3;
        if (next >= 100) {
          clearInterval(interval);
          setProgress(100);
          
          // Start final animation sequence
          setTimeout(() => {
            setShowFinalAnim(true);
          }, 300);

          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 800);
          }, 1200);

          return 100;
        }
        return Math.min(Math.floor(next), 100);
      });
    }, 65);

    return () => clearInterval(interval);
  }, [onComplete]);

  const bladeOpacity = Math.max(0, (progress - 20) / 80);

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

        @keyframes finalScissorOpen {
          0% { transform: scale(1) rotate(0deg); }
         
          100% { transform: scale(5) rotate(360deg)  }
        }

        .final-scissor {
          animation: finalScissorOpen 0.9s ease-in-out forwards;
        }
      `}</style>

      <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-1000 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>

        <div className="relative flex flex-col items-center">

          {/* Circle */}
          <div className="relative w-[160px] h-[160px]">

            <svg width="160" height="160" viewBox="0 0 200 200" className="absolute">
              <circle 
                cx="100" cy="100" r="82" 
                fill="none" 
                stroke="#1f1f1f" 
                strokeWidth="13" 
              />
              <circle 
                cx="100" cy="100" r="82" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="13"
                strokeDasharray="515"
                strokeDashoffset={515 - (progress / 100) * 515}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            </svg>

            {/* Premium Scissor with Final Animation */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 ${showFinalAnim ? 'final-scissor' : ''}`}>
              <svg width="56" height="56" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  {/* Top Blade */}
                  <path 
                    d="M125 78 L62 32 Q48 22 72 38" 
                    stroke="#ffffff" 
                    strokeWidth="8.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill={`rgba(255, 255, 255, ${bladeOpacity})`}
                  />
                  <path 
                    d="M118 73 L68 35" 
                    stroke="#c0c0c0" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />

                  {/* Bottom Blade */}
                  <path 
                    d="M125 132 L62 178 Q48 188 72 172" 
                    stroke="#ffffff" 
                    strokeWidth="8.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill={`rgba(255, 255, 255, ${bladeOpacity})`}
                  />
                  <path 
                    d="M118 137 L68 175" 
                    stroke="#c0c0c0" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />

                  {/* Handles */}
                  <ellipse cx="155" cy="62" rx="14.5" ry="19" fill="#f0f0f0" stroke="#ddd" strokeWidth="4"/>
                  <ellipse cx="155" cy="148" rx="14.5" ry="19" fill="#f0f0f0" stroke="#ddd" strokeWidth="4"/>

                  {/* Pivot */}
                  <circle cx="115" cy="105" r="12" fill="#e8e8e8"/>
                  <circle cx="115" cy="105" r="5.5" fill="#111"/>
                </g>
              </svg>
            </div>
          </div>

          {/* Percentage */}
          <div className="mt-6 font-mono font-medium text-[42px] tracking-[-1px] text-white leading-none"
               style={{ fontFamily: "'Roboto Mono', monospace" }}>
            {progress}%
          </div>

          {/* Tagline */}
          <p className="mt-2 font-mono text-[11.5px] tracking-[3px] text-gray-400 uppercase"
             style={{ fontFamily: "'Roboto Mono', monospace" }}>
            CRAFTING BEAUTY
          </p>

        </div>
      </div>
    </>
  );
};

export default Loading;