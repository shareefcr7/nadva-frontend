"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

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

// Module-level banner cache — fetched once per session
let bannerCache: BannerSlide[] | null = null;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL;

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (animating || index === current) return;
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

  useEffect(() => {
    if (!api) {
      setSlides(fallbackSlides);
      return;
    }

    if (bannerCache) {
      setSlides(bannerCache);
      return;
    }

    const fetchBanners = async () => {
      try {
        const res = await fetch(`${api}/banner`);
        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("Invalid response");
        }
        const data = await res.json();
        if (data.banners && Array.isArray(data.banners)) {
          const activeBanners = data.banners.filter((b: BannerSlide) => b.isActive);
          if (activeBanners.length > 0) {
            bannerCache = activeBanners;
            setSlides(activeBanners);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch banners, using fallback:", err);
      }
      bannerCache = fallbackSlides;
      setSlides(fallbackSlides);
    };

    fetchBanners();
  }, [api]);

  const next = useCallback(() => {
    if (slides.length > 0) goTo((current + 1) % slides.length, "next");
  }, [current, goTo, slides.length]);

  const back = useCallback(() => {
    if (slides.length > 0) goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo, slides.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  if (!slides || slides.length === 0) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .banner-root {
          font-family: 'DM Sans', sans-serif;
          position: relative;
          width: 100%;
          height: clamp(55vh, 92vh, 900px);
          min-height: 420px;
          max-height: 900px;
          background: #070707;
          overflow: hidden;
          cursor: default;
        }

        .slide-img-wrap {
          position: absolute;
          inset: 0;
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slide-img-wrap.active  { opacity: 1; transform: scale(1.03); z-index: 2; }
        .slide-img-wrap.exiting { opacity: 0; transform: scale(1);    z-index: 1; }
        .slide-img-wrap.idle    { opacity: 0; z-index: 0; }

        /* Responsive image display — pure CSS, no window checks */
        .banner-img-mobile  { display: block; position: absolute; inset: 0; }
        .banner-img-desktop { display: none;  position: absolute; inset: 0; }
        @media (min-width: 768px) {
          .banner-img-mobile  { display: none; }
          .banner-img-desktop { display: block; }
        }

        .slide-overlay {
          position: absolute; inset: 0; z-index: 3;
          background: linear-gradient(105deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%);
        }
        .slide-overlay.center {
          background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0.15) 100%);
        }
        .slide-overlay.right {
          background: linear-gradient(255deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%);
        }

        .banner-content {
          position: absolute; inset: 0; z-index: 4;
          display: flex; align-items: center;
          padding: 0 clamp(1.5rem, 5vw, 7vw); box-sizing: border-box;
        }
        .banner-content.center { justify-content: center; text-align: center; }
        .banner-content.right  { justify-content: flex-end; }

        .text-block { max-width: 560px; width: 100%; }
        .banner-content.center .text-block { max-width: 620px; }

        .slide-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 5.5vw, 6.2rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #D4AF37;
          white-space: pre-line;
          word-break: break-word;
          margin: 0 0 clamp(12px, 2vw, 20px);
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.6s 0.22s forwards;
        }

        .slide-sub {
          font-size: clamp(0.75rem, 1.8vw, 0.95rem);
          font-weight: 300; line-height: 1.6; color: #ccc;
          max-width: 400px; margin-bottom: clamp(20px, 3vw, 36px);
          opacity: 0; transform: translateY(20px);
          animation: fadeUp 0.6s 0.36s forwards;
        }
        .banner-content.center .slide-sub { margin-inline: auto; }

        .progress-bar { display: none; }

        .arrow-btn {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 8;
          background: rgba(20,20,20,0.8); border: 1px solid #333;
          width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; backdrop-filter: blur(6px);
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .arrow-btn:hover { background: #D4AF37; border-color: #D4AF37; transform: translateY(-50%) scale(1.08); }
        .arrow-btn:hover svg { stroke: #070707; }
        .arrow-btn svg { stroke: #D4AF37; transition: stroke 0.2s; }
        .arrow-left  { left: 28px; }
        .arrow-right { right: 28px; }

        .dots {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          z-index: 8; display: flex; gap: 10px; align-items: center;
        }
        .dot {
          width: 7px; height: 7px; border-radius: 50%;
          border: 1px solid #D4AF37; background: transparent;
          cursor: pointer; padding: 0; transition: background 0.25s, transform 0.2s;
        }
        .dot.active { background: #D4AF37; transform: scale(1.3); }

        .slide-counter {
          position: absolute; bottom: 32px; right: 40px; z-index: 8;
          font-size: 0.72rem; letter-spacing: 0.12em; color: #666;
        }
        .slide-counter span { color: #D4AF37; font-weight: 500; }

        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 640px) {
          .banner-root {
            height: 56.25vw;
            min-height: 200px;
            max-height: 380px;
          }
          .arrow-btn { display: none; }
          .banner-content { padding: 0 clamp(1rem, 4vw, 1.5rem); }
          .banner-content.right { justify-content: flex-start; }
          .slide-overlay.right {
            background: linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.2) 55%,rgba(0,0,0,0.1) 100%);
          }
          .text-block { max-width: 100%; }
          .banner-content.center .text-block { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .banner-root {
            height: 56.25vw;
            min-height: 200px;
            max-height: 320px;
          }
          .slide-headline { margin-bottom: 8px; }
          .slide-sub { margin-bottom: 16px; }
          .banner-content { padding: 0 1rem; }
        }
      `}</style>

      <section
        className="banner-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Hero banner"
      >
        {/* Slide images */}
        {slides.map((s, i) => {
          let cls = "slide-img-wrap idle";
          if (i === current) cls = "slide-img-wrap active";
          else if (i === prev) cls = "slide-img-wrap exiting";
          return (
            <div key={s._id} className={cls} aria-hidden={i !== current}>
              {/* Mobile image — shown below 768px */}
              <div className="banner-img-mobile">
                <Image
                  src={s.mobileImage}
                  alt={s.headline || "banner mobile"}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                />
              </div>
              {/* Desktop image — shown at 768px+ */}
              <div className="banner-img-desktop">
                <Image
                  src={s.desktopImage}
                  alt={s.headline || "banner desktop"}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  priority={i === 0}
                  sizes="100vw"
                  unoptimized
                />
              </div>
            </div>
          );
        })}

        {/* Gradient overlay */}
        <div className={`slide-overlay ${slides[current].align}`} />

        {/* Text content — key forces re-mount on slide change to retrigger animations */}
        <div className={`banner-content ${slides[current].align}`} key={current}>
          <div className="text-block">
            <h1 className="slide-headline">{slides[current].headline}</h1>
            <p className="slide-sub">{slides[current].subheadline}</p>
          </div>
        </div>

        {/* Progress bar (hidden via CSS, kept for future use) */}
        {!paused && <div className="progress-bar" key={`pb-${current}`} />}

        {/* Navigation arrows */}
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

        {/* Dot indicators */}
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

        {/* Slide counter */}
        <div className="slide-counter">
          <span>{String(current + 1).padStart(2, "0")}</span> /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </section>
    </>
  );
}