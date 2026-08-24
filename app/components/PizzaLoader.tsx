"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PizzaLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function PizzaLoader({
  onComplete,
  minDuration = 1200,
}: PizzaLoaderProps) {
  const [activeSlice, setActiveSlice] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      const progress = Math.min(
        100,
        Math.floor((elapsedTime / minDuration) * 100)
      );

      // Progressively light up all 6 pizza slices
      const slice = Math.min(
        5,
        Math.floor((progress / 100) * 6)
      );

      setActiveSlice(slice);

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setIsVisible(false);

          setTimeout(() => {
            onComplete?.();
          }, 500);
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-50 flex select-none items-center justify-center overflow-hidden bg-[#0d0203]"
        >
          {/* Fire / oven background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_#6e1315_0%,_#2b0709_42%,_#100102_70%,_#050001_100%)]" />

          {/* Soft ambient oven glow */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-[#ff3c00]/20 blur-[100px]"
          />

          {/* Main loader */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Pizza */}
            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex h-36 w-36 items-center justify-center sm:h-48 sm:w-48"
            >
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full drop-shadow-[0_0_28px_rgba(255,85,0,0.65)]"
              >
                <defs>
                  {/* Cheese */}
                  <radialGradient id="cheeseGradient">
                    <stop offset="0%" stopColor="#FFF3A1" />
                    <stop offset="40%" stopColor="#FFD34D" />
                    <stop offset="75%" stopColor="#F5A623" />
                    <stop offset="100%" stopColor="#C96A12" />
                  </radialGradient>

                  {/* Crust */}
                  <radialGradient id="crustGradient">
                    <stop offset="25%" stopColor="#F5BD67" />
                    <stop offset="60%" stopColor="#D18334" />
                    <stop offset="100%" stopColor="#71300D" />
                  </radialGradient>

                  {/* Pepperoni */}
                  <radialGradient id="pepperoniGradient">
                    <stop offset="0%" stopColor="#F46A50" />
                    <stop offset="55%" stopColor="#C82A1E" />
                    <stop offset="100%" stopColor="#6E0A08" />
                  </radialGradient>

                  {/* Slice glow */}
                  <filter
                    id="pizzaGlow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="2.5"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Pizza shadow */}
                  <filter id="sliceShadow">
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="2"
                      floodColor="#000"
                      floodOpacity="0.45"
                    />
                  </filter>
                </defs>

                {/* Outer crust */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="url(#crustGradient)"
                  stroke="#5A2109"
                  strokeWidth="2"
                />

                {/* Crust texture */}
                {[10, 40, 75, 110, 150, 190, 225, 265, 300, 340].map(
                  (angle) => {
                    const rad = (angle * Math.PI) / 180;

                    const x = 100 + Math.cos(rad) * 84;
                    const y = 100 + Math.sin(rad) * 84;

                    return (
                      <circle
                        key={angle}
                        cx={x}
                        cy={y}
                        r="2.8"
                        fill="#6E280B"
                        opacity="0.55"
                      />
                    );
                  }
                )}

                {/* 6 Pizza slices */}
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const angle = index * 60;
                  const isLit = index <= activeSlice;

                  return (
                    <g
                      key={index}
                      transform={`rotate(${angle} 100 100)`}
                    >
                      {/* Unloaded slice */}
                      <path
                        d="M 100,100 L 100,19 A 81,81 0 0,1 170.15,59.5 Z"
                        fill="#250709"
                        stroke="#4B1113"
                        strokeWidth="2"
                      />

                      {/* Loaded pizza slice */}
                      {isLit && (
                        <motion.g
                          initial={{
                            opacity: 0.3,
                            scale: 0.92,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                        >
                          {/* Tomato sauce */}
                          <path
                            d="M 100,100 L 100,20 A 80,80 0 0,1 169.3,60 Z"
                            fill="#A82012"
                          />

                          {/* Melted cheese */}
                          <path
                            d="M 100,100 L 100,24 A 76,76 0 0,1 165.8,62 Z"
                            fill="url(#cheeseGradient)"
                            filter="url(#pizzaGlow)"
                          />

                          {/* Cheese highlights */}
                          <ellipse
                            cx="125"
                            cy="58"
                            rx="11"
                            ry="5"
                            fill="#FFF5B0"
                            opacity="0.25"
                          />

                          <ellipse
                            cx="145"
                            cy="84"
                            rx="8"
                            ry="4"
                            fill="#FFF1A0"
                            opacity="0.25"
                          />

                          {/* Pepperoni */}
                          <g filter="url(#sliceShadow)">
                            <circle
                              cx="121"
                              cy="55"
                              r="7"
                              fill="url(#pepperoniGradient)"
                              stroke="#720907"
                              strokeWidth="1"
                            />

                            <circle
                              cx="142"
                              cy="79"
                              r="7"
                              fill="url(#pepperoniGradient)"
                              stroke="#720907"
                              strokeWidth="1"
                            />

                            <circle
                              cx="112"
                              cy="83"
                              r="5.5"
                              fill="url(#pepperoniGradient)"
                              stroke="#720907"
                              strokeWidth="1"
                            />

                            {/* Pepperoni oil highlights */}
                            <circle
                              cx="119"
                              cy="52"
                              r="2"
                              fill="#FF8B70"
                              opacity="0.55"
                            />

                            <circle
                              cx="140"
                              cy="76"
                              r="2"
                              fill="#FF8B70"
                              opacity="0.45"
                            />
                          </g>
                        </motion.g>
                      )}
                    </g>
                  );
                })}

                {/* Slice separators */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <line
                    key={angle}
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="18"
                    stroke="#6A1E0B"
                    strokeWidth="1.5"
                    opacity="0.65"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}

                {/* Center */}
                <circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="#F6A51A"
                  stroke="#7A2608"
                  strokeWidth="2"
                />

                <circle
                  cx="98"
                  cy="97"
                  r="2.5"
                  fill="#FFE889"
                  opacity="0.65"
                />
              </svg>
            </motion.div>

            {/* Branding */}
            <div className="mt-6 text-center">
              <motion.span
                animate={{
                  opacity: [0.7, 1, 0.7],
                  textShadow: [
                    "0 0 8px rgba(255,85,0,0.3)",
                    "0 0 20px rgba(255,85,0,0.8)",
                    "0 0 8px rgba(255,85,0,0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="graffiti-text block text-xl tracking-wider text-[#FF5500] sm:text-2xl"
              >
                LAZIZ PIZZA™
              </motion.span>

              <h3 className="bebas-text mt-1 text-xl font-black uppercase tracking-widest text-white sm:text-2xl">
                Baking Your Slice...
              </h3>

              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}