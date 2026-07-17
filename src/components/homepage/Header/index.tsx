"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Banner } from "@/types/banner.types";

interface HeroBannerProps {
  banners?: Banner[];
}

export default function HeroBanner({ banners = [] }: HeroBannerProps) {
  // Filter active banners
  const activeBanners = banners.filter((b) => b.isActive);

  // Fallback to local default assets if no active banners in DB
  const defaultBanners: Banner[] = [
    {
      _id: "default",
      desktopImage: "/images/header-homepage.png",
      mobileImage: "/images/header-res-homepage.png",
      isActive: true,
    },
  ];

  const listToRender = activeBanners.length > 0 ? activeBanners : defaultBanners;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (listToRender.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % listToRender.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(timer);
  }, [listToRender.length]);

  return (
    <section className="w-full bg-[#070707] relative" aria-label="Hero banner">
      <AnimatePresence mode="wait">
        <motion.div
          key={listToRender[currentIndex]._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full"
        >
          {/* Desktop Banner: Loaded on screens >= 768px */}
          <div className="hidden md:block w-full">
            <Image
              src={listToRender[currentIndex].desktopImage}
              alt="Palace's Nadav Resorts & Events"
              width={1600}
              height={600}
              sizes="100vw"
              className="w-full h-auto block"
              priority
            />
          </div>

          {/* Mobile Banner: Loaded on screens < 768px */}
          <div className="block md:hidden w-full">
            <Image
              src={listToRender[currentIndex].mobileImage}
              alt="Palace's Nadav Resorts & Events Mobile"
              width={800}
              height={1000}
              sizes="100vw"
              className="w-full h-auto block"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel indicators/dots */}
      {listToRender.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {listToRender.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-[#FF8C00] w-6" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}