"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Slide {
  id: string;
  bgImage: string;
  label: string;
  headline: string;
  description: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: "urban",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMjWvSJG-qKfI4j9389CVLg1fWda1w-3nn2N13c-QkAr5Mil_c2AWy_GABQtYwN2mjIix1gwO0NUce-Jmsrf_yjnjFmoYsno8M1vYtkXEY4w0jdT8nrOIuan4xJ0bsgHhsGAl5YB8_sEmX_3dI8CzASlepACH5qRlN-HZmuryyQOIwMxshiRhOPoo06VwWYxDUjUN2vafNMzaRZVTjMVBvycyd_4NRlSgnAmKmQIaC7WZX2hq3wWEL-vYzqCUBYX6Q5gjyrzzgVJfC",
    label: "NEW ARRIVAL",
    headline: "URBAN TEXTURES",
    description:
      "The Signature Bomber Jacket. Intricate patterns meet a modern silhouette.",
    cta: "SHOP THE LOOK",
    ctaLink: "/shop",
  },
  {
    id: "heritage",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr6Ib1F1wdvvlWSM4V-n6oDs_TGPSL8UjLS4V8hL6c5OPOvL8gvg-fLb5KJfkqMNaFgqXQLI8DbvM98hmFSYTZJxErFSMxKo8249RNz1E1-m_kxLSvYxgaqAP0KrnigGZYncPy_0KBkyqlutrA5ZTVW2VIIpylk8PwGczDPdG-nmRZ1hX_anTh3mbwG7J41kjZgmPLpxQwKcr2tGdMRku_6SY1DrrCRed3ozwMJjYHZzbH2Qn1ExMoOu14YM-7QPl86Mj3juvIdyvq",
    label: "ARTISANAL SERIES",
    headline: "BOLD HERITAGE",
    description:
      "Iconic graphics meet everyday luxury. Crafted from ethically sourced heavy-weight cotton.",
    cta: "EXPLORE COLLECTION",
    ctaLink: "/shop",
  },
  {
    id: "coords",
    bgImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAG041xsjTOQ9ehdF4hkG4mgY-MsQuBS3-fslsI0InrLEMws0jqdjY8Z7SeaMdJb_CyVHqSXHkPG9NyiehDMB-Kj4o8KLDfGrH-xRtr1FR3O8BAxEhwwp3CqZ2QkTFLiNczb0HqjgBjw5LeLCbGnjdP_MqNvMtuTq8qLKfLK5xAX1MgPZSfznpcCPJq6qkEP6CNJX9q9v5TuvWSBM4GIm80GJCjfuMZ7D-k0IMkkWWzIodgA9BQaP7KMrWLMdo6PK5Z7K1JHBW4-g4W",
    label: "SEASONAL EDIT",
    headline: "SUMMER CO-ORDS",
    description:
      "Effortless style for the warmer days. Lightweight linen-blend sets for an elevated leisure look.",
    cta: "SHOP THE SET",
    ctaLink: "/shop",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            idx === current
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          <div className="relative z-10 flex h-full w-full items-center px-6 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              {idx === current && (
                <div className="animate-hero-fade-in-up">
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/80 uppercase mb-4">
                    {slide.label}
                  </p>
                  <h1 className="font-serif text-5xl leading-tight text-white md:text-7xl lg:text-8xl whitespace-pre-line mb-6">
                    {slide.headline}
                  </h1>
                  <p className="font-sans text-sm leading-relaxed text-white/80 max-w-lg mb-8 md:text-base">
                    {slide.description}
                  </p>
                  <button
                    onClick={() => router.push(slide.ctaLink)}
                    className="bg-white text-black px-8 py-4 font-sans text-xs font-bold tracking-[0.15em] hover:bg-white/90 transition-colors active:scale-95"
                  >
                    {slide.cta}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Line indicators */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-[2px] transition-all duration-500 ${
              idx === current
                ? "w-12 bg-white opacity-100"
                : "w-8 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 border border-white/30 text-white hover:bg-white/10 transition-colors"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 border border-white/30 text-white hover:bg-white/10 transition-colors"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-fade-in-up {
          animation: heroFadeInUp 0.8s ease-out forwards;
        }
      `,
        }}
      />
    </section>
  );
}
