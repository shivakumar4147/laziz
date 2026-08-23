"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Award, Store, Users, Sparkles } from "lucide-react";

export default function RollingPizzaPage() {
  const pizzas = [
    {
      src: "/1.png",
      title: "PEPPERONI PIZZA",
      name: "Pepperoni",
      desc: "Loaded with spicy, crispy pepperoni over rich melted cheese and tomato sauce.",
    },
    {
      src: "/2.png",
      title: "MARGHERITA PIZZA",
      name: "Margherita",
      desc: "Classic tomato sauce, creamy mozzarella, and fresh basil for a simple Italian flavor.",
    },
    {
      src: "/3.png",
      title: "VEGGIE SUPREME PIZZA",
      name: "Veggie Supreme",
      desc: "Packed with colorful bell peppers, mushrooms, olives, onions, and fresh vegetables.",
    },
    {
      src: "/4.png",
      title: "GARLIC CHEESE PIZZA",
      name: "Garlic Cheese",
      desc: "A cheesy, buttery pizza topped with golden roasted garlic and herbs.",
    },
    {
      src: "/5.png",
      title: "MEAT LOVERS PIZZA",
      name: "Meat Lovers",
      desc: "A hearty combination of pepperoni, bacon, chicken, and savory meat toppings.",
    },
    {
      src: "/6.png",
      title: "HAWAIIAN PIZZA",
      name: "Hawaiian",
      desc: "A sweet and savory blend of juicy pineapple, ham, melted cheese, and tomato sauce.",
    },
  ];

  const [[page, direction], setPage] = useState([0, 0]);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Ensure positive index bounds for array indexing
  const currentIndex = ((page % pizzas.length) + pizzas.length) % pizzas.length;
  const currentPizza = pizzas[currentIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 600 : -600,
      rotate: direction > 0 ? 360 : -360,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 600 : -600,
      rotate: direction < 0 ? 360 : -360,
      opacity: 0,
      scale: 0.85,
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 400 : -400,
      opacity: 0,
    }),
  };

  return (
    <div className="w-screen h-screen bg-[#070707] flex items-center justify-center overflow-hidden relative select-none">
      
      {/* TOP LEFT CORNER BRANDING IMAGE */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-40 pointer-events-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image.png"
          alt="Branding"
          className="h-10 md:h-14 w-auto object-contain cursor-pointer"
        />
      </div>

      {/* TOP RIGHT CORNER NAVIGATION HEADER */}
      <nav className="fixed top-6 right-6 md:top-8 md:right-8 z-40 flex items-center gap-4 sm:gap-6 md:gap-8 pointer-events-auto">
        <button
          onClick={() => setIsAboutOpen(true)}
          className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-[#FF5500] transition-colors cursor-pointer"
        >
          About Us
        </button>
        {["Outlets", "Gallery", "Awards", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => setIsAboutOpen(true)}
            className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-300 hover:text-[#FF5500] transition-colors cursor-pointer"
          >
            {item}
          </button>
        ))}
        <button 
          onClick={() => setIsAboutOpen(true)}
          className="px-5 py-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#FF6600] rounded-full transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,85,0,0.4)] active:scale-95 border border-[#FF5500]"
        >
          Order
        </button>
      </nav>

      {/* GIANT BACKGROUND NAME TEXT (BEHIND PIZZA) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.h1
            key={page}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bebas-text text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] xl:text-[220px] font-black text-white uppercase tracking-tight text-center whitespace-nowrap drop-shadow-2xl"
          >
            {currentPizza.name}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Animated Rolling Pizza & Ingredients Canvas (FOREGROUND) */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <div key={page} className="relative flex items-center justify-center">
            
            {/* CENTRAL ROLLING PIZZA IMAGE */}
            <motion.img
              src={currentPizza.src}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3 },
              }}
              alt={currentPizza.title}
              className="max-w-[65vw] max-h-[65vh] sm:max-w-[70vw] sm:max-h-[70vh] md:max-w-[75vw] md:max-h-[75vh] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] pointer-events-none"
            />

            {/* THREE CORNER INGREDIENTS WITH POP-IN TRANSITION */}

            {/* Corner 1: ONION (Top-Left / Middle-Left Side) */}
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -35 }}
              animate={{ scale: 1, opacity: 1, rotate: -10 }}
              exit={{ scale: 0, opacity: 0, rotate: 35 }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              src="/onion.png"
              alt="Fresh Onion"
              className="absolute -top-4 -left-12 sm:top-2 sm:-left-24 md:top-6 md:-left-32 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
            />

            {/* Corner 2: GARLIC (Top-Right Corner - Moved Bit Up & Bit Right) */}
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: 35 }}
              animate={{ scale: 1, opacity: 1, rotate: 12 }}
              exit={{ scale: 0, opacity: 0, rotate: -35 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              src="/garlic.png"
              alt="Garlic"
              className="absolute -top-7 -right-16 sm:-top-16 sm:-right-32 md:-top-10 md:-right-44 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
            />

            {/* Corner 3: PANEER (Bottom-Right Corner) */}
            <motion.img
              initial={{ scale: 0, opacity: 0, rotate: -25 }}
              animate={{ scale: 1, opacity: 1, rotate: -8 }}
              exit={{ scale: 0, opacity: 0, rotate: 25 }}
              transition={{ duration: 0.5, delay: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
              src="/paneer.png"
              alt="Paneer Cubes"
              className="absolute -bottom-6 -right-6 sm:-bottom-12 sm:-right-12 md:-bottom-16 md:-right-16 w-20 sm:w-28 md:w-36 h-20 sm:h-28 md:h-36 object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
            />

          </div>
        </AnimatePresence>
      </div>

      {/* BOTTOM LEFT CORNER DESCRIPTION */}
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-30 max-w-xs sm:max-w-sm md:max-w-md pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xs sm:text-sm font-semibold text-white tracking-[0.25em] uppercase mb-2">
              {currentPizza.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
              {currentPizza.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TWO ARROW BUTTONS AT BOTTOM RIGHT CORNER */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-3">
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-white hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500] flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer active:scale-95"
          aria-label="Previous Pizza"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-white hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500] flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer active:scale-95"
          aria-label="Next Pizza"
        >
          <ChevronRight className="w-6 h-6" />
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
              className="bg-[#0F0F0F] border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative text-white shadow-2xl custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAboutOpen(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 border-b border-neutral-800 pb-4">
                <span className="graffiti-text text-xl text-[#FF5500] block mb-1">LAZIZ PIZZA™</span>
                <h2 className="bebas-text text-4xl sm:text-5xl font-extrabold tracking-wider text-white">
                  ABOUT US
                </h2>
                <p className="text-sm font-semibold text-[#FF5500] tracking-wide mt-1">
                  Place where taste never ends.
                </p>
              </div>

              {/* Story Content */}
              <div className="space-y-6 text-sm text-neutral-300 font-normal leading-relaxed">
                
                <p>
                  We are proud to introduce ourselves as <strong className="text-white">Laziz Pizza™</strong> brand run by Laziz Food & Beverages based at Kolhapur, Western Maharashtra. Founded on <strong className="text-[#FF5500]">15th August 2013</strong>. Laziz Pizza™ is known for its Taste & Variety of Pizza. Laziz Pizza has a wide product portfolio of pizza to savor customers taste buds.
                </p>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex items-start gap-3">
                    <Store className="w-6 h-6 text-[#FF5500] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Business Presence</h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        <strong className="text-[#FF5500] font-bold text-base">100+</strong> operational outlets across India.
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex items-start gap-3">
                    <Award className="w-6 h-6 text-[#FF5500] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Award & Recognition</h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        CV Magazine – Pizzeria Restaurant Chain – 2018 India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Founder Spotlight */}
                <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-neutral-800/80 p-5 rounded-2xl mt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-[#FF5500]" />
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Owner’s Desk
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                    The man standing behind the success of Laziz Pizza™ is <strong className="text-white">Keirron J Patil</strong> who has a great passion for cooking. His vast experience in various businesses makes him a unique Entrepreneur. His love for the food industry started in the Russian sub-continent 15 years ago, and now he has applied all his expertise to his own venture.
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Laziz Pizza aims to create young entrepreneurs in India & also to provide job opportunities across India, serving best quality pizza at affordable rates.
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Keirron J Patil</p>
                      <p className="text-xs text-[#FF5500]">Founder & CEO</p>
                    </div>
                    <Sparkles className="w-5 h-5 text-[#FF5500]" />
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
