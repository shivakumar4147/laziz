"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Plus, Check, Sparkles, X, Trash2 } from "lucide-react";

export default function LazizMenuOrderPage() {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: "S" | "M" | "L" }>({
    1: "S",
    2: "S",
    3: "S",
    4: "S",
    5: "S",
    6: "S",
  });

  const [cart, setCart] = useState<{ id: number; title: string; size: string; price: number; img: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      title: "BBQ Meat Pizza",
      desc: "Spicy grilled barbecue meat, melted mozzarella cheese pull, and signature rich tomato sauce.",
      img: "/1.png",
      prices: { S: 199, M: 299, L: 399 },
    },
    {
      id: 2,
      title: "Veggie Delight Pizza",
      desc: "Harmonious mix of bell peppers, onions, mushrooms, olives, and fresh tomatoes over creamy mozzarella.",
      img: "/3.png",
      prices: { S: 199, M: 299, L: 399 },
    },
    {
      id: 3,
      title: "Margherita Pizza",
      desc: "Italian classic with fresh cherry tomatoes, basil leaves, and melted mozzarella cheese.",
      img: "/2.png",
      prices: { S: 199, M: 299, L: 399 },
    },
    {
      id: 4,
      title: "Supreme Pizza",
      desc: "Rich combination of pepperoni, sausage, ham, olives, and fresh vegetables for maximum flavor.",
      img: "/5.png",
      prices: { S: 229, M: 329, L: 429 },
    },
    {
      id: 5,
      title: "Cheese Lover Pizza",
      desc: "Extra thick stretchy mozzarella cheese pull on a golden buttery wood-fired crust.",
      img: "/4.png",
      prices: { S: 229, M: 329, L: 429 },
    },
    {
      id: 6,
      title: "Seafood Pizza",
      desc: "Fresh ocean seafood, sweet pineapple, ham, melted cheese, and tomato sauce blend.",
      img: "/6.png",
      prices: { S: 229, M: 329, L: 429 },
    },
  ]);

  const setSize = (id: number, size: "S" | "M" | "L") => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const addToCart = (item: typeof menuItems[0]) => {
    const size = selectedSizes[item.id] || "S";
    const price = item.prices[size];
    setCart((prev) => [...prev, { id: item.id, title: item.title, size, price, img: item.img }]);
    setNotification(`Added ${item.title} (${size}) to your cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const deleteMenuItem = (id: number, title: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    setNotification(`Removed ${title} from menu`);
    setTimeout(() => setNotification(null), 3000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#5C0F15] text-[#2A1012] relative font-body selection:bg-[#FF5500] selection:text-white pb-24 overflow-y-auto">

      {/* RICH BURGUNDY BACKGROUND TEXTURE */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center pointer-events-none fixed"
        style={{ backgroundImage: `url('/menu_bg.jpg')` }}
      />

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#FF5500] text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 border-2 border-white"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER SECTION */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* Left: Logo & Back Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/20"
            aria-label="Back to Homepage"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/image.png"
            alt="Laziz Pizza Logo"
            className="h-10 sm:h-14 w-auto object-contain cursor-pointer"
          />
        </div>

        {/* Right: Address & Cart Indicator */}
        <div className="flex items-center gap-4 sm:gap-6 text-right">
          <div className="hidden sm:block text-xs text-white/90 font-medium leading-tight">
            <p className="font-extrabold text-sm tracking-wider uppercase text-[#FFD700]">Laziz Pizza™</p>
            <p>Kolhapur, Western Maharashtra</p>
            <p className="text-white/70">contact@lazizpizza.in</p>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white text-[#5C0F15] p-3 rounded-full shadow-xl hover:bg-[#FF5500] hover:text-white transition-all duration-300 group cursor-pointer"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5500] group-hover:bg-white text-white group-hover:text-[#5C0F15] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#5C0F15]">
                {cart.length}
              </span>
            )}
          </button>
        </div>

      </header>

      {/* GIANT "MENU" DISPLAY TITLE MATCHING SCREENSHOT */}
      <div className="relative z-20 text-center py-4 md:py-8 overflow-hidden select-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bebas-text text-7xl sm:text-9xl md:text-[140px] font-black text-[#FFF8ED] tracking-wider uppercase drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
          style={{ textShadow: "4px 4px 0px #2A0508, 8px 8px 15px rgba(0,0,0,0.9)" }}
        >
          MENU
        </motion.h1>
      </div>

      {/* MENU GRID CARDS SECTION */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuItems.map((item) => {
              const currentSize = selectedSizes[item.id] || "S";
              const price = item.prices[currentSize];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="card-texture rounded-[32px] p-6 sm:p-7 shadow-2xl flex flex-col justify-between relative border border-[#E8DCCB] hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] transition-all duration-300 group overflow-hidden"
                >
                  {/* Inner Dashed Card Border Frame & Glow */}
                  <div className="absolute inset-3 rounded-[22px] border border-dashed border-[#D5C2AF]/60 pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/5 pointer-events-none rounded-[32px]" />

                  {/* Top Details */}
                  <div className="relative z-10">
                    <h3 className="bebas-text text-3xl sm:text-4xl font-extrabold text-[#2A1012] tracking-wide mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed mb-4 min-h-[44px]">
                      {item.desc}
                    </p>
                  </div>

                  {/* Central Wood Platter Pizza Visual */}
                  <div className="relative w-full h-44 sm:h-52 my-3 flex items-center justify-center">
                    <div className="absolute inset-x-4 bottom-2 h-8 bg-black/20 rounded-full blur-md" />
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Pricing & Size Selection */}
                  <div className="relative z-10 mt-4 pt-4 border-t border-neutral-200/80">
                    <div className="flex items-center justify-between mb-4">

                      {/* Size Options */}
                      <div className="flex items-center gap-2">
                        {(["S", "M", "L"] as const).map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSize(item.id, sz)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${currentSize === sz
                                ? "bg-[#5C0F15] text-white shadow-md scale-105"
                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                              }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {/* Price Tag */}
                      <div className="text-right">
                        <span className="text-xs text-neutral-500 font-semibold block uppercase">Price</span>
                        <span className="bebas-text text-3xl font-extrabold text-[#5C0F15]">
                          ₹{price}
                        </span>
                      </div>

                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-3 bg-[#5C0F15] hover:bg-[#FF5500] text-white font-extrabold bebas-text text-xl tracking-wider rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-98"
                    >
                      <Plus className="w-5 h-5" />
                      <span>ADD TO ORDER • ₹{price}</span>
                    </button>

                  </div>

                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </main>

      {/* CART DRAWER MODAL WITH REMOVE BUTTONS */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-[#FFF9F3] w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl relative"
            >
              {/* Cart Header */}
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-[#5C0F15]" />
                    <h3 className="bebas-text text-3xl font-bold text-[#5C0F15]">YOUR ORDER</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-neutral-500 hover:text-black rounded-full bg-neutral-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-neutral-400">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-semibold">Your cart is empty</p>
                    <p className="text-xs">Add some delicious Laziz pizzas!</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    {cart.map((cartItem, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3.5 rounded-2xl border border-neutral-200 flex items-center justify-between shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12">
                            <Image src={cartItem.img} alt={cartItem.title} fill className="object-contain" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#2A1012]">{cartItem.title}</h4>
                            <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                              Size: {cartItem.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="bebas-text text-2xl font-bold text-[#5C0F15]">
                            ₹{cartItem.price}
                          </span>
                          {/* Remove Item Button */}
                          <button
                            onClick={() => removeFromCart(idx)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            aria-label="Remove Item"
                            title="Remove from Cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-neutral-200 pt-4 mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-neutral-600 uppercase">Total Amount</span>
                    <span className="bebas-text text-4xl font-extrabold text-[#5C0F15]">
                      ₹{cartTotal}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      alert("Order placed successfully! Piping hot Laziz Pizza is on its way!");
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-4 bg-[#FF5500] hover:bg-[#5C0F15] text-white font-extrabold bebas-text text-2xl tracking-wider rounded-2xl transition-colors shadow-xl flex items-center justify-center gap-2"
                  >
                    <Check className="w-6 h-6" />
                    <span>CONFIRM & PLACE ORDER</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
