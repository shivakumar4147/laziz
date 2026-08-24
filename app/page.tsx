"use client";

import React, { useState } from "react";
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
    <div className="w-screen h-screen bg-[#070707] flex flex-col items-center justify-between overflow-hidden relative select-none">

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

            {/* CIRCULAR TEXT RING WRAPPED AROUND PIZZA */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15 scale-125 sm:scale-115 md:scale-105">
              <svg viewBox="0 0 400 400" className="w-[115%] h-[115%] overflow-visible">
                <path
                  id={`pizzaCirclePath-${page}`}
                  d="M 200, 200 m -165, 0 a 165,165 0 1,1 330,0 a 165,165 0 1,1 -330,0"
                  fill="none"
                />
                <text className="fill-white/90 text-[11px] sm:text-[13px] md:text-[14px] bebas-text tracking-[0.35em] font-bold uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <textPath href={`#pizzaCirclePath-${page}`} startOffset="0%">
                    {`${currentPizza.name} Pizza  ★  Laziz Special  ★  ${currentPizza.name} Pizza  ★  Fresh & Hot  ★  `}
                  </textPath>
                </text>
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
              className="max-w-[55vw] max-h-[38vh] sm:max-w-[62vw] sm:max-h-[52vh] md:max-w-[68vw] md:max-h-[68vh] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-none z-10"
            />

            {/* INGREDIENTS */}
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -35 }} animate={{ scale: 1, opacity: 1, rotate: -10 }} exit={{ scale: 0, opacity: 0, rotate: 35 }} 
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/onion.png" alt="Fresh Onion" decoding="async"
              className="absolute -top-4 -left-6 sm:-top-12 sm:-left-24 md:-top-10 md:-left-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
            />
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: 35 }} animate={{ scale: 1, opacity: 1, rotate: 12 }} exit={{ scale: 0, opacity: 0, rotate: -35 }} 
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/garlic.png" alt="Garlic" decoding="async"
              className="absolute -top-4 -right-6 sm:-top-12 sm:-right-24 md:-top-10 md:-right-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
            />
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -25 }} animate={{ scale: 1, opacity: 1, rotate: -8 }} exit={{ scale: 0, opacity: 0, rotate: 25 }} 
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/paneer.png" alt="Paneer Cubes" decoding="async"
              className="absolute -bottom-4 -right-6 sm:-bottom-12 sm:-right-24 md:-bottom-10 md:-right-36 w-12 sm:w-24 md:w-32 h-12 sm:h-24 md:h-32 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
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

      {/* TWO ARROW BUTTONS AT BOTTOM RIGHT CORNER */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-white hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500] flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer active:scale-95"
          aria-label="Previous Pizza"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-white hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500] flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer active:scale-95"
          aria-label="Next Pizza"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ABOUT US MODAL OVERLAY */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="card-dark-texture border border-neutral-800 rounded-3xl max-w-2xl w-full p-5 sm:p-8 max-h-[88vh] overflow-y-auto relative text-white shadow-2xl custom-scrollbar"
            >
              <button onClick={() => setIsAboutOpen(false)} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <div className="mb-5 sm:mb-6 border-b border-neutral-800 pb-4">
                <span className="graffiti-text text-lg sm:text-xl text-[#FF5500] block mb-1">LAZIZ PIZZA™</span>
                <h2 className="bebas-text text-3xl sm:text-5xl font-extrabold tracking-wider text-white">ABOUT US</h2>
              </div>
              <div className="space-y-5 sm:space-y-6 text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">

                <p>
                  We are proud to introduce ourselves as <strong className="text-white">Laziz Pizza™</strong> brand run by Laziz Food & Beverages based at Kolhapur, Western Maharashtra. Founded on <strong className="text-[#FF5500]">15th August 2013</strong>. Laziz Pizza™ is known for its Taste & Variety of Pizza. Laziz Pizza has a wide product portfolio of pizza to savor customers taste buds.
                </p>

                {/* Highlight Cards */}
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