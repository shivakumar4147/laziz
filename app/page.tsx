"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Award, Store, Users, Sparkles, Menu } from "lucide-react";
import PizzaLoader from "./components/PizzaLoader";

// Static data definitions hoisted outside component to prevent re-creation on render ticks
const PIZZAS = [
  {
    src: "/1.webp",
    title: "PEPPERONI PIZZA",
    name: "PEPPERONI",
    desc: "Loaded with spicy, crispy pepperoni over rich melted cheese and tomato sauce.",
  },
  {
    src: "/2.webp",
    title: "MARGHERITA PIZZA",
    name: "MARGHERITA",
    desc: "Classic tomato sauce, creamy mozzarella, and fresh basil for a simple Italian flavor.",
  },
  {
    src: "/3.webp",
    title: "VEGGIE SUPREME PIZZA",
    name: "VEGGIE SUPREME",
    desc: "Packed with colorful bell peppers, mushrooms, olives, onions, and fresh vegetables.",
  },
  {
    src: "/4.webp",
    title: "GARLIC CHEESE PIZZA",
    name: "GARLIC CHEESE",
    desc: "A cheesy, buttery pizza topped with golden roasted garlic and herbs.",
  },
  {
    src: "/5.webp",
    title: "MEAT LOVERS PIZZA",
    name: "MEAT LOVERS",
    desc: "A hearty combination of pepperoni, bacon, chicken, and savory meat toppings.",
  },
  {
    src: "/6.webp",
    title: "HAWAIIAN PIZZA",
    name: "HAWAIIAN",
    desc: "A sweet and savory blend of juicy pineapple, ham, melted cheese, and tomato sauce.",
  },
];

const CATEGORIES = [
  { name: "Classic Pizza (Veg)", img: "/2.webp" },
  { name: "Exotic Pizza (Veg)", img: "/3.webp" },
  { name: "Special Pizza (Veg)", img: "/4.webp" },
  { name: "Classic Pizza (Non-Veg)", img: "/1.webp" },
  { name: "Exotic Pizza (Non-Veg)", img: "/5.webp" },
  { name: "Special Pizza (Non-Veg)", img: "/6.webp" },
];

const IMAGE_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 320 : -320,
    rotate: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 320 : -320,
    rotate: direction < 0 ? 180 : -180,
    opacity: 0,
    scale: 0.8,
  }),
};

const TOTAL_SEGMENTS = 6;
const SEGMENTS = Array.from({ length: TOTAL_SEGMENTS });

export default function RollingPizzaPage() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Non-blocking async image preloader using requestAnimationFrame/IdleCallback
  useEffect(() => {
    const imagesToPreload = [
      "/1.webp",
      "/2.webp",
      "/3.webp",
      "/4.webp",
      "/5.webp",
      "/6.webp",
      "/onion.webp",
      "/garlic.webp",
      "/paneer.webp",
      "/image.webp",
    ];
    const timer = setTimeout(() => {
      imagesToPreload.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentIndex = ((page % PIZZAS.length) + PIZZAS.length) % PIZZAS.length;
  const currentPizza = PIZZAS[currentIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full max-w-full min-h-screen min-h-[100dvh] bg-[radial-gradient(circle_at_center,_#6e1315_0%,_#1a0303_75%,_#000000_100%)] flex flex-col items-center justify-between overflow-hidden relative select-none">
      
      {/* BAKING PIZZA ANIMATED LOADER */}
      <PizzaLoader minDuration={1000} />

      {/* BACKGROUND (ALL WHITE TEXT FOR VISIBILITY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

        {/* --- EXTREME LEFT COLUMN --- */}
        <div className="absolute top-[18%] left-[2%] md:left-[3%] transform -rotate-12">
          <p className="graffiti-text text-white/20 text-xl sm:text-2xl xl:text-3xl max-w-[200px] leading-tight">I LOVE THE SHAPE OF YOU</p>
        </div>

        <div className="absolute top-[42%] left-[2%] md:left-[3%] transform -rotate-6 hidden sm:block">
          <svg width="140" height="140" viewBox="0 0 100 100" className="absolute -top-6 -left-6 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="50" cy="50" r="45" strokeDasharray="6 4" />
            <circle cx="50" cy="50" r="40" strokeDasharray="2 6" />
          </svg>
          <p className="graffiti-text text-white/20 text-base sm:text-lg xl:text-xl text-center w-28 leading-snug">BUY ME PIZZA & TELL ME I AM PRETTY</p>
        </div>

        <div className="absolute bottom-[28%] left-[2%] md:left-[3%] transform -rotate-3">
          <p className="graffiti-text text-white/20 text-base sm:text-xl xl:text-2xl max-w-[220px] leading-tight">THE PERSON YOU LOVE<br />IS 72.8% PIZZA.</p>
        </div>

        {/* --- EXTREME RIGHT COLUMN --- */}
        <div className="absolute top-[15%] right-[2%] md:right-[3%] transform rotate-6">
          <p className="graffiti-text text-white/20 text-base sm:text-lg xl:text-xl text-right max-w-[180px] leading-tight">YOU ARE WHAT YOU EAT... SO I AM PIZZA.</p>
        </div>

        <div className="absolute top-[32%] right-[2%] md:right-[3%] transform rotate-12">
          <p className="graffiti-text text-white/20 text-3xl sm:text-4xl xl:text-5xl leading-[0.85] text-right">SLICE<br />SLICE<br />BABY</p>
        </div>

        <div className="absolute top-[55%] right-[2%] md:right-[3%] transform -rotate-6 hidden sm:block">
          <p className="graffiti-text text-white/20 text-xl xl:text-3xl whitespace-nowrap">PIZZA At Its Best</p>
        </div>

        {/* Red Badge */}
        <div className="absolute bottom-[25%] right-[2%] md:right-[3%] transform -rotate-12 drop-shadow-2xl">
          <div className="bg-[#cc1111]/90 rounded-full w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 flex items-center justify-center p-2 border-2 border-white/40 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <p className="graffiti-text text-white/90 text-center text-xs sm:text-sm xl:text-base leading-tight">Don't<br />Worry<br /><span className="text-lg sm:text-xl xl:text-2xl">PIZZA</span><br />is Coming</p>
          </div>
        </div>

        <div className="absolute bottom-[8%] right-[4%] md:right-[5%] transform rotate-3 hidden sm:block">
          <p className="graffiti-text text-white/20 text-xl xl:text-3xl whitespace-nowrap">It's Laziz PIZZA DAY</p>
        </div>

        {/* --- SUBTLE ARCHITECTURAL SKETCHES --- */}
        <svg className="absolute bottom-[8%] left-[2%] md:left-[4%] w-20 h-20 sm:w-24 sm:h-24 xl:w-32 xl:h-32 opacity-20 text-white transform -rotate-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10,80 Q50,90 90,80 L85,40 Q50,30 15,40 Z" />
          <path d="M15,60 Q50,70 85,60" />
          <path d="M20,40 L20,82 M40,35 L40,86 M60,35 L60,86 M80,40 L80,82" strokeDasharray="3 3" />
        </svg>

        <svg className="absolute top-[70%] right-[15%] w-12 h-24 sm:w-16 sm:h-32 xl:w-20 xl:h-40 opacity-20 text-white transform rotate-[15deg]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="20" width="40" height="160" rx="3" />
          <line x1="25" y1="40" x2="75" y2="40" />
          <line x1="25" y1="65" x2="75" y2="65" />
          <line x1="25" y1="90" x2="75" y2="90" />
          <line x1="25" y1="115" x2="75" y2="115" />
          <line x1="25" y1="140" x2="75" y2="140" />
          <line x1="25" y1="165" x2="75" y2="165" />
          <line x1="40" y1="20" x2="40" y2="180" strokeDasharray="3 4" />
          <line x1="50" y1="20" x2="50" y2="180" strokeDasharray="3 4" />
          <line x1="60" y1="20" x2="60" y2="180" strokeDasharray="3 4" />
        </svg>

        {/* --- SCATTERED PIZZA SLICES --- */}
        <svg className="absolute top-[60%] left-[16%] w-12 h-12 sm:w-16 sm:h-16 opacity-20 text-white transform rotate-[45deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50,10 L90,80 Q50,95 10,80 Z" />
          <circle cx="50" cy="40" r="5" fill="currentColor" />
          <circle cx="40" cy="65" r="4" fill="currentColor" />
          <circle cx="65" cy="70" r="6" fill="currentColor" />
        </svg>

        <svg className="absolute top-[20%] right-[22%] w-10 h-10 sm:w-12 sm:h-12 opacity-20 text-white transform rotate-[110deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50,10 L90,80 Q50,95 10,80 Z" />
          <circle cx="45" cy="45" r="4" fill="currentColor" />
          <circle cx="55" cy="65" r="5" fill="currentColor" />
        </svg>
      </div>

      {/* TOP LEFT CORNER BRANDING IMAGE */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-40 pointer-events-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image.webp"
          alt="Laziz Pizza Logo"
          className="h-8 sm:h-10 md:h-14 w-auto object-contain cursor-pointer drop-shadow-lg"
          onClick={() => setIsAboutOpen(true)}
          decoding="async"
        />
      </div>

      {/* TOP RIGHT CORNER NAVIGATION HEADER (PC) */}
      <nav className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-40 hidden md:flex items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
        <button onClick={() => setIsAboutOpen(true)} className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF5500] transition-colors cursor-pointer drop-shadow-md">
          About Us
        </button>
        {["Outlets", "Gallery", "Awards", "Contact"].map((item) => (
          <button key={item} onClick={() => setIsAboutOpen(true)} className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF5500] transition-colors cursor-pointer drop-shadow-md">
            {item}
          </button>
        ))}
        <Link
          href="/order"
          className="px-5 py-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#6e1315] bg-white hover:bg-neutral-200 rounded-full transition-all cursor-pointer shadow-xl active:scale-95 border-2 border-white inline-block text-center"
        >
          Order
        </Link>
      </nav>

      {/* TOP RIGHT MOBILE CONTROLS */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-40 flex md:hidden items-center gap-2 pointer-events-auto">
        <Link
          href="/order"
          className="px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#6e1315] bg-white rounded-full active:scale-95 shadow-md inline-block text-center"
        >
          Order
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white bg-black/40 border border-white/20 rounded-full active:scale-95">
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="fixed top-16 right-4 z-40 bg-[#0a0a0a]/95 border border-neutral-800 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex flex-col gap-3 md:hidden min-w-[170px]"
            >
              <button onClick={() => { setIsAboutOpen(true); setIsMobileMenuOpen(false); }} className="text-left text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#FF5500] py-1.5 border-b border-neutral-800 active:scale-95 transition-transform">
                About Us
              </button>
              {["Outlets", "Gallery", "Awards", "Contact"].map((item) => (
                <button key={item} onClick={() => { setIsAboutOpen(true); setIsMobileMenuOpen(false); }} className="text-left text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-[#FF5500] py-1 active:scale-95 transition-transform">
                  {item}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Animated Rolling Pizza & Ingredients Canvas */}
      <div className="relative w-full max-w-full overflow-hidden flex flex-col items-center justify-center z-10 px-4 pt-32 sm:pt-36 md:pt-28 pb-4 md:pb-12 min-h-[460px] sm:min-h-[520px] md:min-h-[580px]">

        {/* DESKTOP GLOWING ARROW BUTTONS */}
        <motion.button
          whileHover={{ scale: 1.15, backgroundColor: "#ffffff", color: "#6e1315" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="hidden md:flex absolute left-[27%] top-1/2 transform -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/30 text-white items-center justify-center transition-shadow duration-300 shadow-[0_0_25px_rgba(0,0,0,0.7)] cursor-pointer group"
          aria-label="Previous Pizza"
        >
          <ChevronLeft className="w-7 h-7 transition-transform group-hover:-translate-x-1" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.15, backgroundColor: "#ffffff", color: "#6e1315" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="hidden md:flex absolute right-[27%] top-1/2 transform -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/30 text-white items-center justify-center transition-shadow duration-300 shadow-[0_0_25px_rgba(0,0,0,0.7)] cursor-pointer group"
          aria-label="Next Pizza"
        >
          <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
        </motion.button>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <div key={page} className="relative w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] md:w-[440px] md:h-[440px] flex items-center justify-center shrink-0 aspect-square">

            {/* CIRCULAR TEXT RING */}
            <motion.div
              custom={direction}
              initial={{ opacity: 0, scale: 0.85, rotate: direction > 0 ? 180 : -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: direction < 0 ? 180 : -180 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 scale-[0.85] sm:scale-95 md:scale-90"
            >
              <svg viewBox="0 0 400 400" className="w-[125%] h-[125%] overflow-visible">
                <defs>
                  <path id={`segmentPath-${page}-${currentIndex}`} d="M 200,30 A 170,170 0 0,1 370,200" fill="none" />
                </defs>
                {SEGMENTS.map((_, i) => {
                  const angle = (i * 360) / TOTAL_SEGMENTS;
                  return (
                    <g key={i} transform={`rotate(${angle} 200 200)`}>
                      <text
                        className="fill-white bebas-text font-black uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-[14px] sm:text-[18px] md:text-[23px]"
                        textLength="165"
                        lengthAdjust="spacingAndGlyphs"
                      >
                        <textPath href={`#segmentPath-${page}-${currentIndex}`} startOffset="0%">
                          {`${currentPizza.name}  ★  `}
                        </textPath>
                      </text>
                    </g>
                  );
                })}
              </svg>
            </motion.div>

            {/* ROLLING PIZZA (GPU Accelerated + Touch Drag Swipe) */}
            <motion.img
              key={page}
              src={currentPizza.src}
              custom={direction}
              variants={IMAGE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              alt={currentPizza.title}
              fetchPriority="high"
              decoding="async"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragSnapToOrigin={true}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40 || info.velocity.x < -300) {
                  paginate(1);
                } else if (info.offset.x > 40 || info.velocity.x > 300) {
                  paginate(-1);
                }
              }}
              className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto cursor-grab active:cursor-grabbing z-10 touch-pan-y select-none"
            />

            {/* INGREDIENTS WITH GPU ACCELERATION */}
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -35 }}
              animate={{ scale: 1, opacity: 1, rotate: -10, y: [0, -10, 0] }}
              exit={{ scale: 0, opacity: 0, rotate: 35 }}
              transition={{
                scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
              }}
              src="/onion.webp" alt="Fresh Onion" decoding="async"
              className="absolute -top-4 -left-2 sm:-top-12 sm:-left-24 md:-top-10 md:-left-36 w-14 sm:w-24 md:w-32 h-14 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
            />
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: 35 }}
              animate={{ scale: 1, opacity: 1, rotate: 12, y: [0, 12, 0] }}
              exit={{ scale: 0, opacity: 0, rotate: -35 }}
              transition={{
                scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              src="/garlic.webp" alt="Garlic" decoding="async"
              className="absolute -top-4 -right-2 sm:-top-12 sm:-right-24 md:-top-10 md:-right-36 w-14 sm:w-24 md:w-32 h-14 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
            />
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: -8, y: [0, -8, 0] }}
              exit={{ scale: 0, opacity: 0, rotate: 25 }}
              transition={{
                scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
                y: { repeat: Infinity, duration: 3.8, ease: "easeInOut" }
              }}
              src="/paneer.webp" alt="Paneer Cubes" decoding="async"
              className="absolute -bottom-2 -right-2 sm:-bottom-12 sm:-right-24 md:-bottom-10 md:-right-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
            />
          </div>
        </AnimatePresence>

        {/* MOBILE & TABLET ARROW BUTTONS */}
        <div className="flex md:hidden items-center gap-8 mt-8 sm:mt-10 mb-2 z-30">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer"
            aria-label="Previous Pizza"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer"
            aria-label="Next Pizza"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 z-30 pb-20 pt-2 md:pt-6">
        <div className="w-full">
          <h2 className="text-xs sm:text-sm md:text-2xl font-extrabold text-white tracking-wide mb-3 sm:mb-4 md:mb-6 text-left drop-shadow-md">
            What do you wanna eat ?
          </h2>

          {/* Mobile Grid */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={idx}
                href="/order"
                className="block"
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white text-center group-hover:text-[#FF5500] transition-colors leading-tight drop-shadow-md">
                    {cat.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* PC Large Horizontal Row */}
          <div className="hidden md:flex flex-row items-center justify-between gap-6 w-full">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={idx}
                href="/order"
                className="flex-1"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-24 h-24 xl:w-28 xl:h-28 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" />
                  </div>
                  <span className="text-xs xl:text-sm font-bold text-white text-center group-hover:text-[#FF5500] transition-colors leading-tight drop-shadow-md whitespace-nowrap">
                    {cat.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT US MODAL */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl max-w-2xl w-full p-5 sm:p-8 max-h-[88vh] overflow-y-auto relative z-10 text-white shadow-2xl custom-scrollbar"
            >
              <button onClick={() => setIsAboutOpen(false)} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer active:scale-95">
                <X className="w-5 h-5" />
              </button>
              <div className="mb-5 sm:mb-6 border-b border-neutral-800 pb-4">
                <span className="graffiti-text text-lg sm:text-xl text-[#FF5500] block mb-1">LAZIZ PIZZA™</span>
                <h2 className="bebas-text text-3xl sm:text-5xl font-extrabold tracking-wider text-white">ABOUT US</h2>
              </div>
              <div className="space-y-5 sm:space-y-6 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                <p>We are proud to introduce ourselves as <strong className="text-white">Laziz Pizza™</strong> brand run by Laziz Food & Beverages based at Kolhapur, Western Maharashtra. Founded on <strong className="text-[#FF5500]">15th August 2013</strong>.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                  <div className="bg-neutral-900/80 border border-neutral-800 p-3.5 sm:p-4 rounded-2xl flex items-start gap-3">
                    <Store className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5500] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Business Presence</h4>
                      <p className="text-[11px] sm:text-xs text-neutral-400 mt-1"><strong className="text-[#FF5500] font-bold text-sm sm:text-base">100+</strong> operational outlets across India.</p>
                    </div>
                  </div>
                  <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex items-start gap-3">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5500] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Award & Recognition</h4>
                      <p className="text-[11px] sm:text-xs text-neutral-400 mt-1">CV Magazine – Pizzeria Restaurant Chain – 2018 India</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800/80 p-4 sm:p-5 rounded-2xl mt-4">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5500]" />
                    <h3 className="text-xs sm:text-base font-bold text-white uppercase tracking-wider">Owner’s Desk</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">The man standing behind the success of Laziz Pizza™ is <strong className="text-white">Keirron J Patil</strong> who has a great passion for cooking.</p>
                  <div className="mt-3.5 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white">Keirron J Patil</p>
                      <p className="text-[10px] sm:text-xs text-[#FF5500]">Founder & CEO</p>
                    </div>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5500]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}