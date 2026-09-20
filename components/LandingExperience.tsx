"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ChevronRight, Eye, Fingerprint, AlertTriangle } from "lucide-react";

function useMouse() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
  });

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);

      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rawX, rawY]);

  return {
    smoothX,
    smoothY,
    rawX,
    rawY,
  };
}

export default function LandingExperience({
  onStart,
  onReset,
  hasSave,
}: {
  onStart: () => void;
  onReset?: () => void;
  hasSave?: boolean;
}) {
  const { smoothX, smoothY, rawX, rawY } = useMouse();

  const [stage, setStage] = useState<"boot" | "room" | "idle">("boot");

  const clipPath = useMotionTemplate`circle(110px at ${rawX}px ${rawY}px)`;

  const bgX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const bgY = useTransform(smoothY, [-1, 1], [-15, 15]);

  useEffect(() => {
    const room = setTimeout(() => setStage("room"), 520);
    const title = setTimeout(() => setStage("idle"), 2350);

    return () => { clearTimeout(room); clearTimeout(title); };
  }, []);

  const handleReset = () => {
    if (onReset) onReset();
  };

  return (
    <div
      className="relative w-full h-screen bg-[#050505] text-[#d4cdb5] overflow-hidden selection:bg-[#7a1818] selection:text-[#d4cdb5] font-sans"
      style={{ cursor: "none" }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500&display=swap');

        .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .gold-cta {
          color: #cfa861;
          border-color: rgba(207,168,97,0.4);
        }

        .gold-cta:hover {
          background: rgba(207,168,97,0.08);
          border-color: rgba(207,168,97,0.9);
          box-shadow: 0 0 25px rgba(207,168,97,0.2);
        }

        .uv-text {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-style: italic;
          color: #ff1111;

          text-shadow:
            0 0 8px rgba(255,0,0,0.9),
            0 2px 4px rgba(50,0,0,0.8),
            0 10px 15px rgba(200,0,0,0.6),
            0 20px 30px rgba(150,0,0,0.4);

          transform: skewX(-8deg) rotate(-4deg);
          letter-spacing: -0.05em;
          filter: contrast(1.5) saturate(1.5);
        }

        .mag-glass {
          overflow: visible;

          border: 4px solid rgba(218,179,101,0.96);

          box-shadow:
            inset 0 0 0 7px rgba(31,20,10,0.45),
            inset 0 0 34px rgba(255,221,153,0.12),
            inset 0 -16px 30px rgba(0,0,0,0.32),
            0 15px 42px rgba(0,0,0,0.86),
            0 0 28px 2px rgba(218,179,101,0.24);

          background: radial-gradient(circle at 32% 21%, rgba(255,239,190,0.08), transparent 42%);
        }

        .mag-glass::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(250,226,165,0.48);
          border-radius: 50%;
          box-shadow: inset 0 0 16px rgba(0,0,0,0.24);
          pointer-events: none;
        }

        .mag-flare {
          position: absolute;
          top: 7%;
          left: 10%;

          width: 44%;
          height: 22%;

          background: radial-gradient(
            ellipse at center,
            rgba(255,247,214,0.34) 0%,
            transparent 70%
          );

          transform: rotate(-38deg);
          border-radius: 50%;
          filter: blur(3px);

          pointer-events: none;
          z-index: 10;
        }

        .mag-joint {
          position: absolute;

          top: 77%;
          left: 78%;
          bottom: auto;
          right: auto;

          width: 12px;
          height: 12px;

          background: radial-gradient(
            circle,
            #d4aa60 0%,
            #8a6828 55%,
            #3a2808 100%
          );

          border-radius: 50%;

          box-shadow: 0 3px 8px rgba(0,0,0,0.9);

          z-index: 5;
          pointer-events: none;
        }

        .mag-handle {
          position: absolute;

          top: 80%;
          left: 78%;
          bottom: auto;
          right: auto;

          width: 12px;
          height: 65px;

          background: linear-gradient(
            to right,
            #2e1e06 0%,
            #c8a052 32%,
            #d4b46a 50%,
            #8a6030 68%,
            #2e1e06 100%
          );

          border-radius: 0 0 9px 9px;

          transform: rotate(-34deg);
          transform-origin: top center;

          box-shadow: 3px 4px 12px rgba(0,0,0,0.95);

          pointer-events: none;
          z-index: 4;
        }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
             rgba(183,190,201,0.045) 2px,
             rgba(183,190,201,0.045) 4px
          );
        }
      `,
        }}
      />

      {/* SVG Grunge Filter */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="uv-grunge" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.07"
              numOctaves="3"
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            <feGaussianBlur
              in="displaced"
              stdDeviation="1.2"
              result="blurred"
            />

            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background parallax */}
      <motion.div
        className="absolute inset-[-5%]"
        style={{
          x: bgX,
          y: bgY,
        }}
      >
        <div className="absolute inset-0 bg-[url('/bg_detective_clean.jpg')] bg-cover bg-center opacity-65" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/70 via-[#020408]/40 to-[#020408]/80" />
      </motion.div>

      {/* Boot overlay */}
      <AnimatePresence>
        {stage === "boot" && (
          <motion.div
            className="absolute inset-0 z-[200] bg-[#020408] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.65,
              ease: "easeInOut",
            }}
          >
            <span aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal UI */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto pointer-events-auto">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={stage === "idle" ? { opacity: 0.75, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex items-center gap-6 mb-6"
            >
              <div className="w-16 h-[1px] bg-[#cfa861]" />

              <span className="font-inter text-[10px] md:text-xs tracking-[0.45em] text-[#cfa861] uppercase">
                Hồ sơ 001
              </span>

              <div className="w-16 h-[1px] bg-[#cfa861]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
              animate={stage === "idle" ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 34, filter: "blur(10px)" }}
              transition={{ duration: 1.35, ease: "easeOut", delay: 0.16 }}
              className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
            >
              HỒ SƠ
              <br />
              ĐẢO CHIỀU
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={stage === "idle" ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.65 }}
              className="font-playfair italic text-xl md:text-3xl text-[#d4cdb5] mb-14 font-light drop-shadow-md"
            >
              "Mọi dấu vết đều có hai mặt."
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "idle" ? 1 : 0 }}
            transition={{
              duration: 1,
              delay: 1.2,
            }}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => onStart()}
                className="group flex items-center justify-center font-inter text-sm md:text-base tracking-[0.25em] uppercase border border-[#cfa861]/40 bg-black/20 px-12 py-5 gold-cta backdrop-blur-[2px] transition-all duration-400 cursor-none"
              >
                <span className="relative z-10 flex items-center gap-4 transition-transform duration-400 group-hover:-translate-y-[2px]">
                  {hasSave ? "TIẾP TỤC ĐIỀU TRA" : "BẮT ĐẦU ĐIỀU TRA"}

                  <ChevronRight
                    size={18}
                    className="transition-transform duration-400 group-hover:translate-x-2"
                  />
                </span>
              </button>

              {hasSave && onReset && (
                <button
                  onClick={handleReset}
                  className="group flex items-center justify-center font-inter text-sm md:text-base tracking-[0.2em] uppercase border border-white/20 bg-black/40 px-8 py-5 hover:bg-white/10 hover:border-white/40 transition-all duration-400 cursor-none text-gray-400 hover:text-white"
                >
                  HỒ SƠ MỚI
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* UV reveal layer */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          clipPath,
        }}
      >
        {/* Dark navy UV background */}
        <motion.div
          className="absolute inset-[-5%]"
          style={{
            x: bgX,
            y: bgY,
          }}
        >
          <div className="absolute inset-0 bg-[#16171a]" />

          <div
            className="absolute inset-0 bg-[url('/bg_detective_clean.jpg')] bg-cover bg-center opacity-42"
            style={{
              filter: "grayscale(0.92) brightness(0.44) contrast(1.12)",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 scanlines opacity-25" />

        <div className="absolute inset-0">
          {/* Fingerprint top-left */}
          <div
            className="absolute top-[8%] left-[6%] opacity-75 mix-blend-screen"
            style={{
              filter: "url(#uv-grunge)",
            }}
          >
            <Fingerprint
              size={52}
              className="text-[#ff1111] drop-shadow-[0_0_18px_rgba(255,0,0,0.9)]"
              strokeWidth={1.2}
            />
          </div>

          {/* Eye top-right */}
          <div
            className="absolute top-[11%] right-[7%] opacity-70 mix-blend-screen"
            style={{
              filter: "url(#uv-grunge)",
              transform: "rotate(22deg)",
            }}
          >
            <Eye
              size={46}
              className="text-[#ff1111] drop-shadow-[0_0_18px_rgba(255,0,0,0.9)]"
              strokeWidth={1.2}
            />
          </div>

          {/* Fingerprint bottom-left */}
          <div
            className="absolute bottom-[20%] left-[9%] opacity-60 mix-blend-screen"
            style={{
              filter: "url(#uv-grunge)",
              transform: "rotate(-14deg)",
            }}
          >
            <Fingerprint
              size={38}
              className="text-[#ff1111] drop-shadow-[0_0_14px_rgba(255,0,0,0.8)]"
              strokeWidth={1.2}
            />
          </div>

          {/* Eye bottom-right */}
          <div
            className="absolute bottom-[13%] right-[6%] opacity-65 mix-blend-screen"
            style={{
              filter: "url(#uv-grunge)",
              transform: "rotate(12deg)",
            }}
          >
            <Eye
              size={40}
              className="text-[#ff1111] drop-shadow-[0_0_14px_rgba(255,0,0,0.8)]"
              strokeWidth={1.2}
            />
          </div>

          {/* Warning left */}
          <div
            className="absolute top-[38%] left-[2%] flex items-center gap-2 opacity-55 mix-blend-screen"
            style={{
              filter: "url(#uv-grunge)",
              transform: "rotate(-7deg)",
            }}
          >
            <AlertTriangle size={16} className="text-[#ff1111]" />

            <span className="font-playfair italic font-bold text-[9px] tracking-[0.35em] text-[#ff1111] uppercase">
              KHÔNG THOÁT
            </span>
          </div>

          {/* Warning right */}
          <div
            className="absolute top-[56%] right-[3%] flex items-center gap-2 opacity-55 mix-blend-screen"
            style={{
              filter: "url(#uv-grunge)",
              transform: "rotate(5deg)",
            }}
          >
            <span className="font-playfair italic font-bold text-[9px] tracking-[0.35em] text-[#ff1111] uppercase">
              AI ĐÃ BIẾT
            </span>

            <AlertTriangle size={16} className="text-[#ff1111]" />
          </div>

          {/* Center hidden content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-screen">
            <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
              <div
                className="flex flex-col items-center"
                style={{
                  filter: "url(#uv-grunge)",
                }}
              >
                <div className="flex items-center gap-5 mb-5 opacity-85">
                  <div className="w-14 h-[1px] bg-[#ff1111]" />

                  <span className="font-playfair italic font-bold text-[11px] tracking-[0.25em] text-[#ff1111] uppercase drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]">
                    LỜI NÓI DỐI
                  </span>

                  <div className="w-14 h-[1px] bg-[#ff1111]" />
                </div>

                <h1 className="uv-text text-6xl md:text-8xl lg:text-9xl mb-6">
                  KẺ
                  <br />
                  DỐI TRÁ
                </h1>

                <p
                  className="font-playfair italic text-xl md:text-2xl text-[#ff1111] mb-12 font-bold drop-shadow-[0_0_18px_rgba(255,0,0,0.8)] opacity-85"
                  style={{
                    transform: "rotate(-2deg)",
                  }}
                >
                  "KHÔNG AI LÀ VÔ TỘI."
                </p>
              </div>

              <div
                className="flex items-center gap-4"
                style={{
                  filter: "url(#uv-grunge)",
                }}
              >
                <div className="flex items-center justify-center font-inter text-sm tracking-[0.22em] uppercase border-2 border-[#cc1111] bg-[#1a0000]/80 px-11 py-5 text-[#ff1111] font-bold drop-shadow-[0_0_18px_rgba(255,0,0,0.8)] skew-x-[3deg]">
                  KHÔNG CÓ ĐƯỜNG LUI
                </div>

                {hasSave && onReset && (
                  <div className="flex items-center justify-center font-inter text-sm tracking-[0.2em] uppercase border-2 border-[#ff1111] bg-black/80 px-7 py-5 text-[#ff1111] font-bold drop-shadow-[0_0_14px_rgba(255,0,0,0.7)] skew-x-[-5deg]">
                    LÃNG QUÊN
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Magnifying glass ring cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[100] w-[220px] h-[220px] pointer-events-none rounded-full mag-glass flex items-center justify-center"
        style={{
          x: useTransform(rawX, (x) => x - 110),
          y: useTransform(rawY, (y) => y - 110),
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d6a45b]/10 via-transparent to-[#5e4120]/10" />

        <div className="mag-flare" />

        <div className="mag-joint" />

        <div className="mag-handle" />
      </motion.div>
    </div>
  );
}
