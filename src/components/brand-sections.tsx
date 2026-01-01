import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";

const BrandSections = () => {
  return (
    <div className="bg-white font-sans text-slate-900">
      {/* SECTION 1: MATERIALS/FABRICS */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Content */}
        <div className="lg:w-1/2 space-y-6">
          <span className="text-blue-700 font-semibold uppercase tracking-widest text-sm">
            Our Quality
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Premium Fabrics For <br /> Your Everyday Wear
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-md">
            We prioritize sustainable sourcing and high-thread counts. Every
            piece is crafted from materials designed to feel like a second skin
            while maintaining durability for years to come.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center text-blue-700 font-medium hover:gap-3 transition-all gap-2 group"
          >
            Explore Our Fabrics
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Right: Overlapping Images */}
        <div className="lg:w-1/2 relative h-125 w-full">
          {/* Top small image */}
          <div className="absolute top-0 left-10 w-48 h-48 rounded-3xl overflow-hidden shadow-xl z-20">
            <Image
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400"
              alt="Fabric texture"
              width={192}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Bottom small image */}
          <div className="absolute bottom-4 left-0 w-56 h-64 rounded-3xl overflow-hidden shadow-xl z-20">
            <Image
              src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400"
              alt="Tailoring detail"
              width={224}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Large main image */}
          <div className="absolute top-10 right-0 w-2/3 h-full rounded-3xl overflow-hidden shadow-2xl z-10">
            <Image
              src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800"
              alt="Model wearing collection"
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <span className="text-blue-700 font-semibold uppercase tracking-widest text-sm">
            Testimonials
          </span>
          <h2 className="text-4xl font-bold">What Our Community Says</h2>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg hover:bg-slate-50 hidden md:block">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg hover:bg-slate-50 hidden md:block">
            <ChevronRight size={24} />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="relative h-125 rounded-[40px] overflow-hidden group"
              >
                {/* Background Image */}
                <Image
                  src={item.bgImage}
                  alt="Customer"
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Box */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-3xl p-6 pt-12 shadow-2xl text-center">
                  {/* Avatar */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="font-bold text-lg">{item.name}</h4>
                  <p className="text-slate-400 text-xs mb-4 uppercase tracking-tighter">
                    {item.role}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                    &apos;{item.quote}&apos;
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < item.stars
                            ? "fill-blue-700 text-blue-700"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Fashion Blogger",
    quote:
      "The quality of the organic cotton is unmatched. Finally, a brand that cares about fit and the planet.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    bgImage:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=500",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    quote:
      "I bought the linen set for my vacation and I’ve never received so many compliments. It's so breathable!",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    bgImage:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500",
    stars: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Stylist",
    quote:
      "The attention to detail in the stitching and the silhouette is what sets this brand apart from fast fashion.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    bgImage:
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
    stars: 4,
  },
];

export default BrandSections;
