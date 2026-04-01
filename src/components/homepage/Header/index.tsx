// import AnimatedCounter from "@/components/ui/AnimatedCounter";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { integralCF } from "@/styles/fonts";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import * as motion from "framer-motion/client";

// const Header = () => {
//   return (
//     <header className="bg-[#F2F0F1] pt-10 md:pt-24 overflow-hidden">
//       <div className="md:max-w-frame mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
//         <section className="max-w-frame px-4">
//           <motion.h2
//             initial={{ y: "100px", opacity: 0, rotate: 10 }}
//             whileInView={{ y: "0", opacity: 1, rotate: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className={cn([
//               integralCF.className,
//               "text-4xl lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8",
//             ])}
//           >
//             FIND CLOTHES THAT MATCHES YOUR STYLE
//           </motion.h2>
//           <motion.p
//             initial={{ y: "100px", opacity: 0 }}
//             whileInView={{ y: "0", opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5, duration: 0.6 }}
//             className="text-black/60 text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]"
//           >
//             Browse through our diverse range of meticulously crafted garments,
//             designed to bring out your individuality and cater to your sense of
//             style.
//           </motion.p>
//           <motion.div
//             initial={{ y: "100px", opacity: 0 }}
//             whileInView={{ y: "0", opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1, duration: 0.6 }}
//           >
//             <Link
//               href="/shop"
//               className="w-full md:w-52 mb-5 md:mb-12 inline-block text-center bg-black hover:bg-black/80 transition-all text-white px-14 py-4 rounded-full hover:animate-pulse"
//             >
//               Shop Now
//             </Link>
//           </motion.div>
//           <motion.div
//             initial={{ y: "100px", opacity: 0 }}
//             whileInView={{ y: "0", opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 1.5, duration: 0.6 }}
//             className="flex md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
//           >
//             <div className="flex flex-col">
//               <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
//                 <AnimatedCounter from={0} to={200} />+
//               </span>
//               <span className="text-xs xl:text-base text-black/60 text-nowrap">
//                 International Brands
//               </span>
//             </div>
//             <Separator
//               className="ml-6 md:ml-0 h-12 md:h-full bg-black/10"
//               orientation="vertical"
//             />
//             <div className="flex flex-col ml-6 md:ml-0">
//               <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
//                 <AnimatedCounter from={0} to={2000} />+
//               </span>
//               <span className="text-xs xl:text-base text-black/60 text-nowrap">
//                 High-Quality Products
//               </span>
//             </div>
//             <Separator
//               className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 bg-black/10"
//               orientation="vertical"
//             />
//             <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
//               <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
//                 <AnimatedCounter from={0} to={3000} />+
//               </span>
//               <span className="text-xs xl:text-base text-black/60 text-nowrap">
//                 Happy Customers
//               </span>
//             </div>
//           </motion.div>
//         </section>
//         <motion.section
//           initial={{ y: "100px", opacity: 0, rotate: 10 }}
//           whileInView={{ y: "0", opacity: 1, rotate: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 2.3, duration: 0.8 }}
//           className="relative md:px-4 min-h-[448px] md:min-h-[428px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/images/header-res-homepage.png')] md:bg-[url('/images/header-homepage.png')]"
//         >
//           <Image
//             priority
//             src="/icons/big-star.svg"
//             height={104}
//             width={104}
//             alt="big star"
//             className="absolute right-7 xl:right-0 top-12 max-w-[76px] max-h-[76px] lg:max-w-24 lg:max-h-max-w-24 xl:max-w-[104px] xl:max-h-[104px] animate-[spin_4s_infinite]"
//           />
//           <Image
//             priority
//             src="/icons/small-star.svg"
//             height={56}
//             width={56}
//             alt="small star"
//             className="absolute left-7 md:left-0 top-36 sm:top-64 md:top-44 lg:top-56 max-w-11 max-h-11 md:max-w-14 md:max-h-14 animate-[spin_3s_infinite]"
//           />
//         </motion.section>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import { useState, useEffect, useCallback } from "react";

// interface BannerSlide {
//   id: number;
//   image: string;
//   tag: string;
//   headline: string;
//   subheadline: string;
//   cta: string;
//   ctaSecondary?: string;
//   align: "left" | "center" | "right";
// }
type BannerSlide = {
  _id: string;
  desktopImage: string;
  mobileImage: string;
  isActive: boolean;
  align: "left" | "center" | "right";
  tag: string;
  headline: string;
  subheadline: string;
  cta?: string;
  ctaSecondary?: string;
};

// Fallback banners in case API is not available
const fallbackSlides: BannerSlide[] = [
  {
    _id: "1",
    desktopImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=90",
    mobileImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90",
    tag: "New Arrivals",
    headline: "Dress for\nthe Moment",
    subheadline: "Curated pieces for every occasion — minimal, intentional, yours.",
    cta: "Shop Collection",
    ctaSecondary: "Explore Lookbook",
    align: "left",
    isActive: true,
  },
  {
    _id: "2",
    desktopImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=90",
    mobileImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=90",
    tag: "Limited Edition",
    headline: "Summer\nEssentials",
    subheadline: "Lightweight fabrics. Bold silhouettes. Made to move with you.",
    cta: "View All",
    ctaSecondary: "Find Your Size",
    align: "center",
    isActive: true,
  },
  {
    _id: "3",
    desktopImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=90",
    mobileImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=90",
    tag: "Sale — Up to 40% Off",
    headline: "Classic\nRedefined",
    subheadline: "Timeless staples reimagined for the modern wardrobe.",
    cta: "Shop Sale",
    align: "right",
    isActive: true,
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (animating || index === current) return;
      setDirection(dir);
      setPrev(current);
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    },
    [animating, current]
  );
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${api}/api/banner`, {
          next: { revalidate: 3600 },
        });
        const data = await res.json();

        if (data.banners && Array.isArray(data.banners)) {
          // Only active banners
          const activeBanners = data.banners.filter((b: BannerSlide) => b.isActive);
          if (activeBanners.length > 0) {
            setSlides(activeBanners);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch banners, using fallback:", err);
      }
      // Use fallback banners if API fails or no active banners found
      setSlides(fallbackSlides);
    };

    fetchBanners();
  }, []);

  const next = useCallback(() => {
    if (slides.length > 0) {
      goTo((current + 1) % slides.length, "next");
    }
  }, [current, goTo, slides.length]);

  const back = useCallback(() => {
    if (slides.length > 0) {
      goTo((current - 1 + slides.length) % slides.length, "prev");
    }
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  // Fallback will ensure slides is never empty
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .banner-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          width: 100%;
          height: 92vh;
          min-height: 560px;
          max-height: 900px;
          background: #fff;
          overflow: hidden;
          cursor: default;
        }

        /* ── slide images ── */
        .slide-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slide-img.active {
          opacity: 1;
          transform: scale(1.03);
          z-index: 2;
        }
        .slide-img.exiting {
          opacity: 0;
          transform: scale(1);
          z-index: 1;
        }
        .slide-img.idle {
          opacity: 0;
          z-index: 0;
        }

        /* ── overlay ── */
        .slide-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: linear-gradient(
            105deg,
            rgba(255,255,255,0.78) 0%,
            rgba(255,255,255,0.44) 50%,
            rgba(255,255,255,0.08) 100%
          );
        }
        .slide-overlay.center {
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.70) 38%,
            rgba(255,255,255,0.22) 100%
          );
        }
        .slide-overlay.right {
          background: linear-gradient(
            255deg,
            rgba(255,255,255,0.80) 0%,
            rgba(255,255,255,0.44) 50%,
            rgba(255,255,255,0.06) 100%
          );
        }

        /* ── content ── */
        .banner-content {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          padding: 0 7vw;
        }
        .banner-content.center { justify-content: center; text-align: center; }
        .banner-content.right  { justify-content: flex-end; }

        .text-block {
          max-width: 560px;
        }
        .banner-content.center .text-block { max-width: 620px; }

        /* tag */
        .slide-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #111;
          border: 1px solid #111;
          padding: 5px 14px;
          margin-bottom: 22px;
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.55s 0.1s forwards;
        }

        /* headline */
        .slide-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 6.5vw, 6.2rem);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          white-space: pre-line;
          margin: 0 0 20px;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.6s 0.22s forwards;
        }

        /* sub */
        .slide-sub {
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.65;
          color: #444;
          max-width: 400px;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.6s 0.36s forwards;
        }
        .banner-content.center .slide-sub { margin-inline: auto; }

        /* buttons */
        .btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(16px);
          animation: fadeUp 0.55s 0.5s forwards;
        }
        .banner-content.center .btn-row { justify-content: center; }

        .btn-primary {
          background: #0a0a0a;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 34px;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
        }
        .btn-primary:hover { background: #333; transform: translateY(-2px); }

        .btn-ghost {
          background: transparent;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 34px;
          border: 1px solid #0a0a0a;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, transform 0.2s;
        }
        .btn-ghost:hover { background: #0a0a0a; color: #fff; transform: translateY(-2px); }

        /* ── progress bar ── */
        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: #0a0a0a;
          z-index: 10;
          animation: progress 5s linear;
        }
        @keyframes progress {
          from { width: 0; }
          to   { width: 100%; }
        }

        /* ── nav arrows ── */
        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 8;
          background: rgba(255,255,255,0.88);
          border: 1px solid #ddd;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          backdrop-filter: blur(6px);
        }
        .arrow-btn:hover {
          background: #0a0a0a;
          border-color: #0a0a0a;
          transform: translateY(-50%) scale(1.08);
        }
        .arrow-btn:hover svg { stroke: #fff; }
        .arrow-btn svg { stroke: #0a0a0a; transition: stroke 0.2s; }
        .arrow-left  { left: 28px; }
        .arrow-right { right: 28px; }

        /* ── dot indicators ── */
        .dots {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid #0a0a0a;
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background 0.25s, transform 0.2s;
        }
        .dot.active {
          background: #0a0a0a;
          transform: scale(1.3);
        }

        /* ── slide counter ── */
        .slide-counter {
          position: absolute;
          bottom: 32px;
          right: 40px;
          z-index: 8;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          color: #888;
        }
        .slide-counter span { color: #0a0a0a; font-weight: 500; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .arrow-btn { display: none; }
          .banner-content { padding: 0 5vw; }
          .banner-content.right { justify-content: flex-start; }
          .slide-overlay.right {
            background: linear-gradient(180deg,rgba(255,255,255,0.15) 0%,rgba(255,255,255,0.72) 55%,rgba(255,255,255,0.12) 100%);
          }
        }
      `}</style>

      <section
        className="banner-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Hero banner"
      >
        {/* slide images */}
        {slides.map((s, i) => {
          let cls = "slide-img idle";
          if (i === current) cls = "slide-img active";
          else if (i === prev) cls = "slide-img exiting";
          return (
            <div
              key={s._id}
              className={cls}
              // style={{ backgroundImage: `url(${s.image})` }}
//               style={{
//   // backgroundImage: `url(${s.desktopImage})`
  

//   backgroundImage: `url(${isMobile ? s.mobileImage : s.desktopImage})`

// }}
style={{
  backgroundImage: `url(${
    isMobile ? s.mobileImage : s.desktopImage
  })`,
}}
              aria-hidden={i !== current}
            />
          );
        })}

        {/* overlay */}
        <div className={`slide-overlay ${slides[current].align}`} />

        {/* text content — re-mount on slide change to retrigger animations */}
        <div className={`banner-content ${slides[current].align}`} key={current}>
          <div className="text-block">
            {/* <span className="slide-tag">{slides[current].tag}</span> */}
            
            <h1 className="slide-headline">{slides[current].headline}</h1>
            <p className="slide-sub">{slides[current].subheadline}</p>
            <div className="btn-row">
              {/* <button className="btn-primary">{slide.cta}</button>
              {slide.ctaSecondary && (
                <button className="btn-ghost">{slide.ctaSecondary}</button>
              )} */}
            </div>
          </div>
        </div>

        {/* progress bar */}
        {!paused && <div className="progress-bar" key={`pb-${current}`} />}

        {/* arrows */}
        <button className="arrow-btn arrow-left" onClick={back} aria-label="Previous slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="arrow-btn arrow-right" onClick={next} aria-label="Next slide">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* dots */}
        <div className="dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? " active" : ""}`}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* counter */}
        <div className="slide-counter">
          <span>{String(current + 1).padStart(2, "0")}</span> /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </section>
    </>
  );
}