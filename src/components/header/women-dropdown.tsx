import React from "react";
import Image from "next/image";
import Link from "next/link";

function WomenDropdown(props: {
  setShowWomenNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const categorySlug = "women";

  const sections: {
    title: string;
    slug: string;
    items: { label: string; slug: string }[];
  }[] = [
      {
        title: "Casual Wear",
        slug: "casual-wear",
        items: [
          { label: "T-shirts", slug: "t-shirts" },
          { label: "Blouses", slug: "blouses" },
          { label: "Skirts", slug: "skirts" },
          { label: "Pants", slug: "pants" },
          { label: "Dresses", slug: "dresses" },
        ],
      },
      {
        title: "Formal Wear",
        slug: "formal-wear",
        items: [
          { label: "Suits", slug: "suits" },
          { label: "Tailored Blazers", slug: "tailored-blazers" },
          { label: "Dress Shirts", slug: "dress-shirts" },
          { label: "Office Skirts", slug: "office-skirts" },
          { label: "Trousers", slug: "trousers" },
        ],
      },
      {
        title: "Evening Wear",
        slug: "evening-wear",
        items: [
          { label: "Dresses", slug: "dresses" },
          { label: "Gowns", slug: "gowns" },
          { label: "Cocktail Dresses", slug: "cocktail-dresses" },
          { label: "Special Occasion Wear", slug: "special-occasion-wear" },
          { label: "Trousers", slug: "trousers" },
        ],
      },
      {
        title: "Outerwear",
        slug: "outerwear",
        items: [
          { label: "Coats", slug: "coats" },
          { label: "Jackets", slug: "jackets" },
          { label: "Raincoats", slug: "raincoats" },
          { label: "Capes", slug: "capes" },
        ],
      },
      {
        title: "Lingerie and Loungewear",
        slug: "lingerie-and-loungewear",
        items: [
          { label: "Bras", slug: "bras" },
          { label: "Panties", slug: "panties" },
          { label: "Sleepwear", slug: "sleepwear" },
          { label: "Robes", slug: "robes" },
          { label: "Pyjama Sets", slug: "pyjama-sets" },
        ],
      },
    ];

  return (
    <div
      className="bg-[#00000078] min-h-screen flex justify-center fixed top-0 left-0 right-0 z-50"
      onClick={() => props.setShowWomenNavMenu(false)}
    >
      <div
        className="bg-white shadow-lg px-20 py-10 w-full flex gap-10 h-max"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Timeless Elegance, Effortless Confidence
          </h2>
          <p className="text-lg mb-6 text-gray-800">
            Discover fashion that celebrates your beauty with grace and style.
          </p>
          <hr className="text-gray-200 mb-5" />

          <div className="flex gap-12 text-sm text-pink-800 max-w-5xl">
            {sections.map((sec) => (
              <div key={sec.slug}>
                <h4 className="font-semibold text-lg mb-1">
                  <Link
                    href={`/shop/${categorySlug}/${sec.slug}`}
                    onClick={() => props.setShowWomenNavMenu(false)}
                  >
                    {sec.title}:
                  </Link>
                </h4>
                <ul className="space-y-1">
                  {sec.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/shop/${categorySlug}/${sec.slug}/${it.slug}`}
                        onClick={() => props.setShowWomenNavMenu(false)}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Images */}
        <div className="w-[20rem] h-[30rem] relative flex flex-col gap-2">
          <Image
            src="https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Woman+on+jacket.jpg"
            alt="Woman in jacket"
            width={500}
            height={500}
            className="rounded-md object-cover"
          />
          <Image
            src="https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/A+lady+on+hat.jpg"
            alt="Lady with hat"
            width={500}
            height={500}
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default WomenDropdown;
