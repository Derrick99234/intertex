import Image from "next/image";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Fashion Blogger",
    quote:
      "The quality of the organic cotton is unmatched. Finally, a brand that cares about fit and the planet.",
    avatar: "/icons/profile.png",
    stars: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    quote:
      "I bought the linen set for my vacation and I've never received so many compliments. It's so breathable!",
    avatar: "/icons/profile.png",
    stars: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Stylist",
    quote:
      "The attention to detail in the stitching and the silhouette is what sets this brand apart from fast fashion.",
    avatar: "/icons/profile.png",
    stars: 4,
  },
];

const BrandSections = () => {
  return (
    <section className="bg-[#faf9f7] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="font-sans text-xs font-semibold tracking-[0.3em] text-[#735a45] uppercase">
            Testimonials
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-[#2f3331] md:text-5xl lg:text-6xl">
            What Our Community Says
          </h2>
          <div className="mx-auto mt-6 h-px w-12 bg-[#735a45]" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-[#ffffff] p-10 text-center"
            >
              <div className="h-16 w-16 overflow-hidden bg-[#e0e3e0]">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill={i < item.stars ? "#735a45" : "#d6dbd7"}
                    className="transition-colors"
                  >
                    <path d="M7 0l1.572 4.837h5.086l-4.114 2.99 1.572 4.837L7 9.674l-4.116 2.99 1.572-4.837-4.114-2.99h5.086z" />
                  </svg>
                ))}
              </div>
              <p className="mt-6 font-serif text-lg italic leading-relaxed text-[#5c605d]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-8">
                <h4 className="font-sans text-sm font-bold text-[#2f3331]">
                  {item.name}
                </h4>
                <p className="font-sans text-xs text-[#735a45]">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSections;
