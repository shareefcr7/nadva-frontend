"use client";

import { useState, useEffect, useCallback } from "react";

export type BannerSlide = {
  _id: string;
  desktopImage: string;
  mobileImage: string;
  isActive: boolean;
  align: "left" | "center" | "right";
  tag: string;
  headline: string;
  subheadline: string;
};

export default function BannerSlider({ slides }: { slides: BannerSlide[] }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  // Detect mobile on client only — avoids SSR mismatch
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setPrev(current);
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
    },
    [animating, current]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);
  const back = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo, slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused, slides.length]);

  if (!slides.length) return null;

  return (
    <section
      className="banner-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero banner"
    >
      {slides.map((s, i) => {
        const cls = i === current ? "slide-img active" : i === prev ? "slide-img exiting" : "slide-img idle";
        return (
          <div
            key={s._id}
            className={cls}
            style={{ backgroundImage: `url(${isMobile ? s.mobileImage : s.desktopImage})` }}
            aria-hidden={i !== current}
          />
        );
      })}

      <div className={`slide-overlay ${slides[current].align}`} />

      <div className={`banner-content ${slides[current].align}`} key={current}>
        <div className="text-block">
          <span className="slide-tag">{slides[current].tag}</span>
          <h1 className="slide-headline">{slides[current].headline}</h1>
          <p className="slide-sub">{slides[current].subheadline}</p>
        </div>
      </div>

      {!paused && <div className="progress-bar" key={`pb-${current}`} />}

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

      <div className="dots" role="tablist" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="slide-counter">
        <span>{String(current + 1).padStart(2, "0")}</span> /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}
