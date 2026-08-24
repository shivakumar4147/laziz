"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Award, Store, Users, Sparkles, Menu } from "lucide-react";

export default function RollingPizzaPage() {
  const pizzas = [
    {
      src: "/1.png",
      title: "PEPPERONI PIZZA",
      name: "PEPPERONI",
      desc: "Loaded with spicy, crispy pepperoni over rich melted cheese and tomato sauce.",
    },
    {
      src: "/2.png",
      title: "MARGHERITA PIZZA",
      name: "MARGHERITA",
      desc: "Classic tomato sauce, creamy mozzarella, and fresh basil for a simple Italian flavor.",
    },
    {
      src: "/3.png",
      title: "VEGGIE SUPREME PIZZA",
      name: "VEGGIE SUPREME",
      desc: "Packed with colorful bell peppers, mushrooms, olives, onions, and fresh vegetables.",
    },
    {
      src: "/4.png",
      title: "GARLIC CHEESE PIZZA",
      name: "GARLIC CHEESE",
      desc: "A cheesy, buttery pizza topped with golden roasted garlic and herbs.",
    },
    {
      src: "/5.png",
      title: "MEAT LOVERS PIZZA",
      name: "MEAT LOVERS",
      desc: "A hearty combination of pepperoni, bacon, chicken, and savory meat toppings.",
    },
    {
      src: "/6.png",
      title: "HAWAIIAN PIZZA",
      name: "HAWAIIAN",
      desc: "A sweet and savory blend of juicy pineapple, ham, melted cheese, and tomato sauce.",
    },
  ];

  const [[page, direction], setPage] = useState([0, 0]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Preload all pizza and ingredient images on mount for instant, smooth appearance
  useEffect(() => {
    const imagesToPreload = [
      "/1.png",
      "/2.png",
      "/3.png",
      "/4.png",
      "/5.png",
      "/6.png",
      "/onion.png",
      "/garlic.png",
      "/paneer.png",
      "/image.png",
    ];
    imagesToPreload.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const currentIndex = ((page % pizzas.length) + pizzas.length) % pizzas.length;
  const currentPizza = pizzas[currentIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Snappy, synchronized animation for the pizza
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
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
      x: direction < 0 ? 500 : -500,
      rotate: direction < 0 ? 180 : -180,
      opacity: 0,
      scale: 0.8,
    }),
  };

  // Generate 6 evenly spaced segments around the circle (Name + Star)
  const totalSegments = 6;
  const segments = Array.from({ length: totalSegments });

  return (
    <div className="w-screen h-screen bg-[radial-gradient(circle_at_center,_#6e1315_0%,_#1a0303_75%,_#000000_100%)] flex flex-col items-center justify-between overflow-hidden relative select-none">
      
      {/* BACKGROUND (ALL WHITE TEXT FOR VISIBILITY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* --- EXTREME LEFT COLUMN --- */}
        <div className="absolute top-[18%] left-[2%] md:left-[3%] transform -rotate-12">
          <p className="graffiti-text text-white/20 text-2xl xl:text-3xl max-w-[200px] leading-tight">I LOVE THE SHAPE OF YOU</p>
        </div>

        <div className="absolute top-[42%] left-[2%] md:left-[3%] transform -rotate-6">
          <svg width="160" height="160" viewBox="0 0 100 100" className="absolute -top-6 -left-6 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5">
             <circle cx="50" cy="50" r="45" strokeDasharray="6 4"/>
             <circle cx="50" cy="50" r="40" strokeDasharray="2 6"/>
          </svg>
          <p className="graffiti-text text-white/20 text-lg xl:text-xl text-center w-28 leading-snug">BUY ME PIZZA & TELL ME I AM PRETTY</p>
        </div>

        <div className="absolute bottom-[25%] left-[2%] md:left-[3%] transform -rotate-3">
           <p className="graffiti-text text-white/20 text-xl xl:text-2xl max-w-[220px] leading-tight">THE PERSON YOU LOVE<br/>IS 72.8% PIZZA.</p>
        </div>

        {/* --- EXTREME RIGHT COLUMN --- */}
        <div className="absolute top-[15%] right-[2%] md:right-[3%] transform rotate-6">
           <p className="graffiti-text text-white/20 text-lg xl:text-xl text-right max-w-[180px] leading-tight">YOU ARE WHAT YOU EAT... SO I AM PIZZA.</p>
        </div>

        <div className="absolute top-[32%] right-[2%] md:right-[3%] transform rotate-12">
           <p className="graffiti-text text-white/20 text-4xl xl:text-5xl leading-[0.85] text-right">SLICE<br/>SLICE<br/>BABY</p>
        </div>

        <div className="absolute top-[55%] right-[2%] md:right-[3%] transform -rotate-6">
           <p className="graffiti-text text-white/20 text-2xl xl:text-3xl whitespace-nowrap">PIZZA At Its Best</p>
        </div>

        {/* Red Badge */}
        <div className="absolute bottom-[22%] right-[2%] md:right-[3%] transform -rotate-12 drop-shadow-2xl">
           <div className="bg-[#cc1111]/90 rounded-full w-28 h-28 xl:w-32 xl:h-32 flex items-center justify-center p-2 border-2 border-white/40 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <p className="graffiti-text text-white/90 text-center text-sm xl:text-base leading-tight">Don't<br/>Worry<br/><span className="text-xl xl:text-2xl">PIZZA</span><br/>is Coming</p>
           </div>
        </div>

        <div className="absolute bottom-[8%] right-[4%] md:right-[5%] transform rotate-3">
           <p className="graffiti-text text-white/20 text-2xl xl:text-3xl whitespace-nowrap">It's Laziz PIZZA DAY</p>
        </div>

        {/* --- SUBTLE ARCHITECTURAL SKETCHES --- */}
        <svg className="absolute bottom-[8%] left-[2%] md:left-[4%] w-24 h-24 xl:w-32 xl:h-32 opacity-20 text-white transform -rotate-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10,80 Q50,90 90,80 L85,40 Q50,30 15,40 Z" />
            <path d="M15,60 Q50,70 85,60" />
            <path d="M20,40 L20,82 M40,35 L40,86 M60,35 L60,86 M80,40 L80,82" strokeDasharray="3 3"/>
        </svg>

        <svg className="absolute top-[70%] right-[15%] w-16 h-32 xl:w-20 xl:h-40 opacity-20 text-white transform rotate-[15deg]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1.5">
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
        <svg className="absolute top-[60%] left-[16%] w-16 h-16 opacity-20 text-white transform rotate-[45deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50,10 L90,80 Q50,95 10,80 Z" />
          <circle cx="50" cy="40" r="5" fill="currentColor"/>
          <circle cx="40" cy="65" r="4" fill="currentColor"/>
          <circle cx="65" cy="70" r="6" fill="currentColor"/>
        </svg>

        <svg className="absolute top-[20%] right-[22%] w-12 h-12 opacity-20 text-white transform rotate-[110deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M50,10 L90,80 Q50,95 10,80 Z" />
          <circle cx="45" cy="45" r="4" fill="currentColor"/>
          <circle cx="55" cy="65" r="5" fill="currentColor"/>
        </svg>
      </div>

      {/* TOP LEFT CORNER BRANDING IMAGE */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-40 pointer-events-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image.png"
          alt="Laziz Pizza Logo"
          className="h-8 sm:h-10 md:h-14 w-auto object-contain cursor-pointer drop-shadow-lg"
          onClick={() => setIsAboutOpen(true)}
          decoding="async" 
        />
      </div>

      {/* TOP RIGHT CORNER NAVIGATION HEADER */}
      <nav className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-40 hidden md:flex items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
        <button onClick={() => setIsAboutOpen(true)} className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF5500] transition-colors cursor-pointer drop-shadow-md">
          About Us
        </button>
        {["Outlets", "Gallery", "Awards", "Contact"].map((item) => (
          <button key={item} onClick={() => setIsAboutOpen(true)} className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FF5500] transition-colors cursor-pointer drop-shadow-md">
            {item}
          </button>
        ))}
        {/* Connected Order Link */}
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 z-40 bg-[#0a0a0a] border border-neutral-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 md:hidden min-w-[160px]"
          >
            <button onClick={() => { setIsAboutOpen(true); setIsMobileMenuOpen(false); }} className="text-left text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#FF5500] py-1 border-b border-neutral-800">
              About Us
            </button>
            {["Outlets", "Gallery", "Awards", "Contact"].map((item) => (
              <button key={item} onClick={() => { setIsAboutOpen(true); setIsMobileMenuOpen(false); }} className="text-left text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-[#FF5500] py-1">
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Rolling Pizza & Ingredients Canvas */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center z-10 px-4 pt-12 md:pt-0">
        
        {/* CREATIVE LEFT GLOWING ARROW BUTTON */}
        <motion.button
          whileHover={{ scale: 1.15, backgroundColor: "#ffffff", color: "#6e1315" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="absolute left-[12%] sm:left-[23%] md:left-[27%] z-30 w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center transition-shadow duration-300 shadow-[0_0_25px_rgba(0,0,0,0.7)] cursor-pointer group"
          aria-label="Previous Pizza"
        >
          <ChevronLeft className="w-7 h-7 transition-transform group-hover:-translate-x-1" />
        </motion.button>

        {/* CREATIVE RIGHT GLOWING ARROW BUTTON */}
        <motion.button
          whileHover={{ scale: 1.15, backgroundColor: "#ffffff", color: "#6e1315" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="absolute right-[12%] sm:right-[23%] md:right-[27%] z-30 w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center transition-shadow duration-300 shadow-[0_0_25px_rgba(0,0,0,0.7)] cursor-pointer group"
          aria-label="Next Pizza"
        >
          <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
        </motion.button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <div key={page} className="relative flex flex-col items-center justify-center">
            
            {/* PERFECTLY EVEN BALANCED CIRCULAR TEXT LOOP */}
            <motion.div 
              custom={direction}
              initial={{ opacity: 0, scale: 0.85, rotate: direction > 0 ? 180 : -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: direction < 0 ? 180 : -180 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 scale-100 sm:scale-95 md:scale-90"
            >
              <svg viewBox="0 0 400 400" className="w-[125%] h-[125%] overflow-visible">
                <defs>
                  {/* Clean arc path for each segment */}
                  <path id={`segmentPath-${page}`} d="M 200,30 A 170,170 0 0,1 370,200" fill="none" />
                </defs>
                {segments.map((_, i) => {
                  const angle = (i * 360) / totalSegments;
                  return (
                    <g key={i} transform={`rotate(${angle} 200 200)`}>
                      <text 
                        className="fill-white bebas-text font-black uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-[15px] sm:text-[19px] md:text-[23px]"
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

            {/* ROLLING PIZZA */}
            <motion.img
              src={currentPizza.src}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              alt={currentPizza.title}
              fetchPriority="high"
              decoding="async"
              style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              className="max-w-[55vw] max-h-[38vh] sm:max-w-[62vw] sm:max-h-[52vh] md:max-w-[68vw] md:max-h-[68vh] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-none z-10 gpu-accelerated"
            />

            {/* INGREDIENTS */}
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -35 }} animate={{ scale: 1, opacity: 1, rotate: -10 }} exit={{ scale: 0, opacity: 0, rotate: 35 }} 
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/onion.png" alt="Fresh Onion" decoding="async"
              style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              className="absolute -top-4 -left-6 sm:-top-12 sm:-left-24 md:-top-10 md:-left-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none gpu-accelerated"
            />
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: 35 }} animate={{ scale: 1, opacity: 1, rotate: 12 }} exit={{ scale: 0, opacity: 0, rotate: -35 }} 
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/garlic.png" alt="Garlic" decoding="async"
              style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              className="absolute -top-4 -right-6 sm:-top-12 sm:-right-24 md:-top-10 md:-right-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none gpu-accelerated"
            />
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -25 }} animate={{ scale: 1, opacity: 1, rotate: -8 }} exit={{ scale: 0, opacity: 0, rotate: 25 }} 
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/paneer.png" alt="Paneer Cubes" decoding="async"
              style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              className="absolute -bottom-4 -right-6 sm:-bottom-12 sm:-right-24 md:-bottom-10 md:-right-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none gpu-accelerated"
            />
          </div>
        </AnimatePresence>

      </div>

      {/* BOTTOM LEFT DESCRIPTION */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 z-30 max-w-[180px] sm:max-w-xs md:max-w-md pointer-events-none bg-black/40 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
            <h3 className="text-[12px] sm:text-sm md:text-base font-bold text-white tracking-[0.2em] uppercase mb-1">
              {currentPizza.title}
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-neutral-300 font-medium leading-relaxed">
              {currentPizza.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ABOUT US MODAL */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }}
              className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl max-w-2xl w-full p-5 sm:p-8 max-h-[88vh] overflow-y-auto relative text-white shadow-2xl custom-scrollbar"
            >
              <button onClick={() => setIsAboutOpen(false)} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer">
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