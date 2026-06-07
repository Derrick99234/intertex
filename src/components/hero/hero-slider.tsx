"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const slides = [
  {
    id: "1912",
    bgColor: "bg-[#BFB2A2]",
    content: (
      <div className="text-center text-white flex justify-center items-center flex-col max-w-3xl pl-10 max-[1246px]:pl-0">
        <span className="font-bold text-3xl">The</span>
        <span className="text-[10rem] max-[1246px]:text-[4rem] block leading-none">
          1912
        </span>
        <span className="text-bold block text-3xl">Collections</span>
        <p className="text-xl max-[1246px]:text-sm">
          &ldquo;Our suits are tailored for confidence — combining premium
          fabrics, <br className="max-[1246px]:hidden" />
          precise cuts, and timeless design to help you make a lasting <br />
          impression at every occasion.
        </p>
      </div>
    ),
    leftImage: {
      src: "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/elegant-man-suit+1.png",
      alt: "young elegant billionaire",
      width: 490,
      className: "bottom-0 left-0 max-[1246px]:max-w-60",
    },
    rightImage: {
      src: "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/young-african-businessman-classy-suit-removebg-preview+1.png",
      alt: "young african billionaire",
      width: 350,
      className: "bottom-0 right-0 max-[1246px]:max-w-48",
    },
    showShopButton: true,
  },
  {
    id: "tailored",
    bgImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920",
    content: (
      <div className="text-center text-white flex justify-center items-center flex-col max-w-3xl">
        <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#c6b7a2] uppercase">
          The Digital Tailor
        </span>
        <h2 className="font-serif text-6xl leading-tight tracking-tight md:text-7xl lg:text-8xl mt-4">
          Tailored for
          <br />
          Distinction
        </h2>
        <p className="text-sm md:text-base text-[#d1cdca] max-w-lg mt-4">
          Where heritage craftsmanship meets modern design. Every stitch tells a
          story of precision and passion.
        </p>
      </div>
    ),
    leftImage: null,
    rightImage: null,
    showShopButton: true,
  },
  {
    id: "summer",
    bgImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1920",
    content: (
      <div className="text-center text-white flex justify-center items-center flex-col max-w-3xl">
        <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#f0ceb3] uppercase">
          Summer 2026
        </span>
        <h2 className="font-serif text-5xl leading-tight tracking-tight md:text-6xl lg:text-7xl mt-4">
          Light &amp; Linen
          <br />
          Season
        </h2>
        <p className="text-sm md:text-base text-[#e0d3c8] max-w-lg mt-4">
          Breathable fabrics, relaxed silhouettes — redefining warm-weather
          elegance.
        </p>
      </div>
    ),
    leftImage: null,
    rightImage: null,
    showShopButton: true,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <section
            className={`relative grid grid-cols-[30rem_1fr_20rem] max-[1246px]:grid-cols-[1fr] max-[1246px]:min-h-[85vh] max-[1246px]:items-start ${slide.bgColor || ""} items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)`}
          >
            {slide.bgImage && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.bgImage})` }}
                />
                <div className="absolute inset-0 bg-[#0d0e0e]/60" />
              </>
            )}
            {slide.leftImage && (
              <Image
                src={slide.leftImage.src}
                alt={slide.leftImage.alt}
                width={slide.leftImage.width}
                height={300}
                className={`absolute z-10 ${slide.leftImage.className}`}
              />
            )}

            <div className="relative z-10 col-span-3">{slide.content}</div>

            {slide.showShopButton && (
              <div className="relative z-10 col-span-3">
                <button
                  className="text-white px-18 py-4 mt-5 bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-all cursor-pointer"
                  onClick={() => router.push("/shop")}
                >
                  Shop Now
                </button>
              </div>
            )}

            {slide.rightImage && (
              <Image
                src={slide.rightImage.src}
                alt={slide.rightImage.alt}
                width={slide.rightImage.width}
                height={200}
                className={`absolute z-10 ${slide.rightImage.className}`}
              />
            )}
          </section>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
