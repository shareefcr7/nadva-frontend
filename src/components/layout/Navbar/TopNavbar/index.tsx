"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "../SearchInput";

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="z-50 sticky top-0 w-full bg-white/90 backdrop-blur-md shadow-md border-b border-black/5 py-2.5 transition-all duration-500"
    >
      <div className="flex relative max-w-frame mx-auto items-center justify-between px-4 xl:px-0 gap-3.5">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.jpg"
              alt="Nadav Resorts & Events Logo"
              width={80}
              height={80}
              className="rounded-lg object-contain transition-all duration-500 h-10 w-10 sm:h-12 sm:w-12"
              priority
            />
          </Link>
        </div>

        {/* Center: Search Input */}
        <div className="flex-1 max-w-md mx-auto">
          <Suspense fallback={<div className="h-9 bg-[#F0F0F0] rounded-full animate-pulse w-full" />}>
            <SearchInput />
          </Suspense>
        </div>

        {/* Right: Quick Links / Navigation */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/shop" className="text-xs sm:text-sm font-semibold hover:text-[#FF8C00] transition-colors whitespace-nowrap">
            All Resorts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
