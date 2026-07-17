"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SearchInput from "../SearchInput";
import ResTopNavbar from "./ResTopNavbar";

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

  const navItems = [
    { id: 1, type: "MenuItem" as const, label: "Tarif", url: "/#tarif", children: [] },
    { id: 3, type: "MenuItem" as const, label: "Contact", url: "/#contact", children: [] },
    { id: 4, type: "MenuItem" as const, label: "Location", url: "/#location", children: [] },
    { id: 5, type: "MenuItem" as const, label: "Our Facilities", url: "/shop", children: [] },
  ];

  return (
    <nav
      className={cn(
        "z-50 sticky top-0 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5 py-3 transition-all duration-300",
        isScrolled && "shadow-md py-2.5 bg-white/98"
      )}
    >
      <div className="flex relative max-w-frame mx-auto items-center justify-between px-4 xl:px-0 gap-3">
        {/* Left: Logo & Brand Name */}
        <div className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.jpg"
              alt="Nadav Resorts & Events Logo"
              width={200}
              height={60}
              className="rounded-lg object-contain transition-transform duration-300 hover:scale-105 h-11 sm:h-14 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation links (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-xs xl:text-sm font-semibold text-gray-700 hover:text-white px-4 py-1.5 rounded-full border border-black/5 hover:bg-[#FF8C00] hover:border-transparent transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Search bar, "Our Facilities" button (Desktop) and Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-1 justify-end max-w-md">
          <div className="flex-1 max-w-[160px] sm:max-w-xs md:max-w-sm">
            <Suspense fallback={<div className="h-9 bg-[#F0F0F0] rounded-full animate-pulse w-full" />}>
              <SearchInput />
            </Suspense>
          </div>
          
          <Link 
            href="/shop" 
            className="hidden lg:flex items-center justify-center text-xs xl:text-sm font-semibold text-white bg-[#1B5E20] hover:bg-[#154d19] px-6 h-11 rounded-full transition-all duration-200 whitespace-nowrap shadow-sm"
          >
            Our Facilities
          </Link>

          {/* Mobile hamburger menu (below lg) */}
          <div className="lg:hidden flex items-center flex-shrink-0">
            <ResTopNavbar data={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
