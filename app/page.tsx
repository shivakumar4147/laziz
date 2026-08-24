"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Award, Store, Users, Sparkles, Menu } from "lucide-react";
import PizzaLoader from "./components/PizzaLoader";

const SMALL_TOMATO_SIZE = "w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36";

const PIZZAS = [
  {
    src: "/1.webp",
    title: "PEPPERONI PIZZA",
    name: "PEPPERONI",
    desc: "Loaded with spicy, crispy pepperoni over rich melted cheese and tomato sauce.",
    floating: [
      { src: "/pepperoni.webp", alt: "Pepperoni", pos: "-top-16 -left-16 sm:-top-24 sm:-left-24", size: "w-28 sm:w-40 md:w-48 h-28 sm:h-40 md:h-48", duration: 3.5, floatOffset: -8 },
      { src: "/bellpepper.webp", alt: "Bell Pepper", pos: "-top-16 -right-16 sm:-top-24 sm:-right-24", size: "w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44", duration: 4.0, floatOffset: 8 },
      { src: "/tomato.webp", alt: "Tomato Slice", pos: "-bottom-12 -right-12 sm:-bottom-20 sm:-right-20", size: SMALL_TOMATO_SIZE, duration: 3.8, floatOffset: -6 },
    ],
  },
  {
    src: "/2.webp",
    title: "MARGHERITA PIZZA",
    name: "MARGHERITA",
    desc: "Classic tomato sauce, creamy mozzarella, and fresh basil for a simple Italian flavor.",
    floating: [
      { src: "/onion.webp", alt: "Fresh Onion", pos: "-top-10 -left-10 sm:-top-16 sm:-left-16", size: "w-14 sm:w-20 md:w-24 h-14 sm:h-20 md:h-24", duration: 3.5, floatOffset: -8 },
      { src: "/garlic.webp", alt: "Garlic", pos: "-top-12 -right-12 sm:-top-18 sm:-right-18", size: "w-20 sm:w-28 md:w-34 h-20 sm:h-28 md:h-34", duration: 4.0, floatOffset: 8 },
      { src: "/tomato.webp", alt: "Tomato Slice", pos: "-bottom-10 -right-10 sm:-bottom-16 sm:-right-16", size: SMALL_TOMATO_SIZE, duration: 3.8, floatOffset: -6 },
    ],
  },
  {
    src: "/3.webp",
    title: "VEGGIE SUPREME PIZZA",
    name: "VEGGIE SUPREME",
    desc: "Packed with colorful bell peppers, mushrooms, olives, onions, and fresh vegetables.",
    floating: [
      { src: "/bellpepper.webp", alt: "Bell Pepper", pos: "-top-16 -left-16 sm:-top-24 sm:-left-24", size: "w-28 sm:w-40 md:w-48 h-28 sm:h-40 md:h-48", duration: 3.6, floatOffset: -7 },
      { src: "/mushroom.webp", alt: "Mushroom", pos: "-top-16 -right-16 sm:-top-24 sm:-right-24", size: "w-24 sm:w-36 md:w-44 h-24 sm:h-36 md:h-44", duration: 4.2, floatOffset: 7 },
      { src: "/tomato.webp", alt: "Tomato Slice", pos: "-bottom-12 -right-12 sm:-bottom-20 sm:-right-20", size: SMALL_TOMATO_SIZE, duration: 3.4, floatOffset: -5 },
    ],
  },
  {
    src: "/4.webp",
    title: "GARLIC CHEESE PIZZA",
    name: "GARLIC CHEESE",
    desc: "A cheesy, buttery pizza topped with golden roasted garlic and herbs.",
    floating: [
      { src: "/garlic.webp", alt: "Garlic", pos: "-top-12 -left-12 sm:-top-18 sm:-left-18", size: "w-20 sm:w-28 md:w-34 h-20 sm:h-28 md:h-34", duration: 3.7, floatOffset: -9 },
      { src: "/paneer.webp", alt: "Paneer Cubes", pos: "-top-10 -right-10 sm:-top-16 sm:-right-16", size: "w-16 sm:w-24 md:w-28 h-16 sm:h-24 md:h-28", duration: 3.9, floatOffset: 6 },
      { src: "/tomato.webp", alt: "Tomato Slice", pos: "-bottom-10 -right-10 sm:-bottom-16 sm:-right-16", size: SMALL_TOMATO_SIZE, duration: 4.1, floatOffset: -7 },
    ],
  },
  {
    src: "/5.webp",
    title: "MEAT LOVERS PIZZA",
    name: "MEAT LOVERS",
    desc: "A hearty combination of pepperoni, bacon, chicken, and savory meat toppings.",
    floating: [
      { src: "/bacon.webp", alt: "Bacon Strip", pos: "-top-11 -left-11 sm:-top-16 sm:-left-16", size: "w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36", duration: 3.5, floatOffset: -8 },
      { src: "/pepperoni.webp", alt: "Pepperoni", pos: "-top-16 -right-16 sm:-top-24 sm:-right-24", size: "w-28 sm:w-40 md:w-48 h-28 sm:h-40 md:h-48", duration: 4.0, floatOffset: 8 },
      { src: "/tomato.webp", alt: "Tomato Slice", pos: "-bottom-16 -right-16 sm:-bottom-24 sm:-right-24", size: SMALL_TOMATO_SIZE, duration: 3.7, floatOffset: -6 },
    ],
  },
  {
    src: "/6.webp",
    title: "HAWAIIAN PIZZA",
    name: "HAWAIIAN",
    desc: "A sweet and savory blend of juicy pineapple, ham, melted cheese, and tomato sauce.",
    floating: [
      { src: "/bacon.webp", alt: "Bacon Strip", pos: "-top-11 -left-11 sm:-top-16 sm:-left-16", size: "w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36", duration: 3.8, floatOffset: -7 },
      { src: "/bellpepper.webp", alt: "Bell Pepper", pos: "-top-16 -right-16 sm:-top-24 sm:-right-24", size: "w-28 sm:w-40 md:w-48 h-28 sm:h-40 md:h-48", duration: 3.5, floatOffset: 9 },
      { src: "/tomato.webp", alt: "Tomato Slice", pos: "-bottom-16 -right-16 sm:-bottom-24 sm:-right-24", size: SMALL_TOMATO_SIZE, duration: 4.2, floatOffset: -8 },
    ],
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
    x: direction > 0 ? 150 : -150,
    rotate: direction > 0 ? 45 : -45,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 150 : -150,
    rotate: direction < 0 ? -45 : 45,
    opacity: 0,
    scale: 0.9,
  }),
};

const TOTAL_SEGMENTS = 6;
const SEGMENTS = Array.from({ length: TOTAL_SEGMENTS });

export default function RollingPizzaPage() {
  const [[page, direction], setPage] = useState([4, 0]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use a ref to track scroll interactions smoothly via requestAnimationFrame
  const isScrollingRef = useRef(false);

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  // Use requestAnimationFrame to throttle interval triggers during active window scrolling
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWindowScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150); // Small debounce buffer after scrolling stops
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Continuous loop that checks if the user is currently flinging/scrolling the window
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered || isAboutOpen) return;
      
      // If user is actively scrolling the window, skip this tick to prevent jank, 
      // ensuring smooth 60fps scrolling performance!
      if (isScrollingRef.current) return;

      paginate(1);
    }, 2000);

    return () => clearInterval(interval);
  }, [paginate, isHovered, isAboutOpen]);

  useEffect(() => {
    const imagesToPreload = [
      "/1.webp", "/2.webp", "/3.webp", "/4.webp", "/5.webp", "/6.webp",
      "/onion.webp", "/garlic.webp", "/paneer.webp", "/bellpepper.webp",
      "/bacon.webp", "/mushroom.webp", "/pepperoni.webp", "/tomato.webp", "/image.webp",
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

  return (
    <div className="w-full max-w-full min-h-screen min-h-[100dvh] bg-[radial-gradient(ellipse_at_center,_#6e1315_0%,_#1a0303_75%,_#000000_100%)] flex flex-col items-center justify-start overflow-x-hidden relative select-none [transform:translateZ(0)]">
      <PizzaLoader minDuration={1000} />

      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
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
        <div className="absolute top-[15%] right-[2%] md:right-[3%] transform rotate-6">
          <p className="graffiti-text text-white/20 text-base sm:text-lg xl:text-xl text-right max-w-[180px] leading-tight">YOU ARE WHAT YOU EAT... SO I AM PIZZA.</p>
        </div>
        <div className="absolute top-[32%] right-[2%] md:right-[3%] transform rotate-12">
          <p className="graffiti-text text-white/20 text-3xl sm:text-4xl xl:text-5xl leading-[0.85] text-right">SLICE<br />SLICE<br />BABY</p>
        </div>
        <div className="absolute top-[55%] right-[2%] md:right-[3%] transform -rotate-6 hidden sm:block">
          <p className="graffiti-text text-white/20 text-xl xl:text-3xl whitespace-nowrap">PIZZA At Its Best</p>
        </div>
        <div className="absolute bottom-[25%] right-[2%] md:right-[3%] transform -rotate-12 drop-shadow-2xl">
          <div className="bg-[#cc1111]/90 rounded-full w-24 h-24 sm:w-28 sm:h-28 xl:w-32 xl:h-32 flex items-center justify-center p-2 border-2 border-white/40 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <p className="graffiti-text text-white/90 text-center text-xs sm:text-sm xl:text-base leading-tight">Don't<br />Worry<br /><span className="text-lg sm:text-xl xl:text-2xl">PIZZA</span><br />is Coming</p>
          </div>
        </div>
        <div className="absolute bottom-[8%] right-[4%] md:right-[5%] transform rotate-3 hidden sm:block">
          <p className="graffiti-text text-white/20 text-xl xl:text-3xl whitespace-nowrap">It's Laziz PIZZA DAY</p>
        </div>
      </div>

      {/* BRANDING LOGO */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-40 pointer-events-auto">
        <img
          src="/image.webp"
          alt="Laziz Pizza Logo"
          className="h-8 sm:h-10 md:h-14 w-auto object-contain cursor-pointer drop-shadow-lg"
          onClick={() => setIsAboutOpen(true)}
          decoding="async"
        />
      </div>

      {/* NAVIGATION HEADER (DESKTOP) */}
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

      {/* MOBILE CONTROLS */}
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

      {/* MOBILE DROPDOWN */}
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
              transition={{ duration: 0.25 }}
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

      {/* MAIN CAROUSEL CANVAS */}
      <div 
        className="relative w-full max-w-full flex flex-col items-center justify-center z-10 px-4 pt-32 sm:pt-36 md:pt-36 pb-2 md:pb-6 [will-change:transform]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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

        <div className="relative w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] md:w-[440px] md:h-[440px] flex items-center justify-center shrink-0 aspect-square [transform:translateZ(0)]">
          <AnimatePresence initial={false} custom={direction}>
            <React.Fragment key={page}>
              <motion.div
                custom={direction}
                initial={{ opacity: 0, rotate: direction > 0 ? 30 : -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: direction < 0 ? 30 : -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 scale-[0.85] sm:scale-95 md:scale-90 [will-change:transform,opacity]"
              >
                <svg viewBox="0 0 400 400" className="w-[125%] h-[125%] overflow-visible">
                  <defs>
                    <path id={`segmentPath-${page}`} d="M 200,30 A 170,170 0 0,1 370,200" fill="none" />
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
                          <textPath href={`#segmentPath-${page}`} startOffset="0%">
                            {`${currentPizza.name}  ★  `}
                          </textPath>
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </motion.div>

              <motion.img
                src={currentPizza.src}
                custom={direction}
                variants={IMAGE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 350, damping: 35 },
                  opacity: { duration: 0.25 },
                  rotate: { duration: 0.35, ease: "easeOut" }
                }}
                alt={currentPizza.title}
                fetchPriority="high"
                decoding="async"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                dragSnapToOrigin={true}
                onDragStart={() => setIsHovered(true)}
                onDragEnd={(_, info) => {
                  setIsHovered(false);
                  if (info.offset.x < -40 || info.velocity.x < -300) {
                    paginate(1);
                  } else if (info.offset.x > 40 || info.velocity.x > 300) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto cursor-grab active:cursor-grabbing z-10 touch-pan-y select-none [will-change:transform,opacity]"
              />

              {/* FLOATING INGREDIENTS */}
              {currentPizza.floating.map((item, idx) => (
                <motion.img
                  key={`${page}-${idx}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, item.floatOffset, 0] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    scale: { duration: 0.3 },
                    y: { repeat: Infinity, duration: item.duration, ease: "easeInOut" }
                  }}
                  src={item.src}
                  alt={item.alt}
                  decoding="async"
                  className={`absolute ${item.pos} ${item.size} object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none [will-change:transform]`}
                />
              ))}
            </React.Fragment>
          </AnimatePresence>
        </div>

        <div className="flex md:hidden items-center gap-8 mt-6 sm:mt-8 mb-2 z-30">
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

      {/* CATEGORY GRID */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 z-30 pb-12 pt-2 md:pt-4">
        <div className="w-full">
          <h2 className="text-xs sm:text-sm md:text-2xl font-extrabold text-white tracking-wide mb-3 sm:mb-4 md:mb-6 text-left drop-shadow-md">
            What do you wanna eat ?
          </h2>

          <div className="grid grid-cols-3 gap-3 md:hidden">
            {CATEGORIES.map((cat, idx) => (
              <Link key={idx} href="/order" className="block">
                <motion.div whileTap={{ scale: 0.92 }} className="group flex flex-col items-center cursor-pointer">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-white text-center group-hover:text-[#FF5500] transition-colors leading-tight drop-shadow-md">
                    {cat.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex flex-row items-center justify-between gap-4 xl:gap-6 w-full">
            {CATEGORIES.map((cat, idx) => (
              <Link key={idx} href="/order" className="flex-1">
                <motion.div whileHover={{ y: -8, scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group flex flex-col items-center cursor-pointer">
                  <div className="relative w-24 h-24 xl:w-28 xl:h-28 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]" />
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
                    <h3 className="text-xs sm:text-base font-bold text-white uppercase tracking-wider">Owner's Desk</h3>
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