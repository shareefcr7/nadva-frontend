"use client";

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
      className={cn(
        "z-50 transition-all duration-500",
        isHome ? "fixed top-0 left-0 right-0 w-full" : "sticky top-0 w-full",
        isHome
          ? isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-black/5 py-3"
            : "bg-transparent py-5 md:py-6"
          : "bg-white/90 backdrop-blur-md shadow-md border-b border-black/5 py-3"
      )}
    >
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start px-4 xl:px-0">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center mr-3 lg:mr-10 gap-2"
          >
            <Image
              src="/images/logo.jpg"
              alt="VARUNA Logo"
              width={80}
              height={80}
              className={cn(
                "rounded-lg object-contain transition-all duration-500",
                (!isHome || isScrolled) ? "h-12 w-12" : "h-16 w-16"
              )}
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
