import React from "react";
import Image from "next/image";
import Link from "next/link";

function MenDropdown(props: {
  setShowMenNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const categorySlug = "men";

  // Explicit slugs so they match your backend
  const sections: {
    title: string;
    slug: string; // subcategory slug
    items: { label: string; slug: string }[]; // type slug
  }[] = [
    {
      title: "Casual Wear",
      slug: "casual-wear",
      items: [
        { label: "T-shirts", slug: "t-shirts" },
        { label: "Polos", slug: "polos" },
        { label: "Sweatshirts", slug: "sweatshirts" },
        { label: "Hoodies", slug: "hoodies" },
        { label: "Denim Jeans", slug: "denim-jeans" },
      ],
    },
    {
      title: "Formal Wear",
      slug: "formal-wear",
      items: [
        { label: "Dress Shirts", slug: "dress-shirts" },
        { label: "Trousers", slug: "trousers" },
        { label: "Business Attire", slug: "business-attire" },
      ],
    },
    {
      title: "Sports Wear",
      slug: "sports-wear",
      items: [
        { label: "Joggers", slug: "joggers" },
        { label: "Shorts", slug: "shorts" },
        { label: "Gym Wear", slug: "gym-wear" },
        { label: "Athleisure", slug: "athleisure" },
      ],
    },
    {
      title: "Outerwear",
      slug: "outerwear",
      items: [
        { label: "Jackets", slug: "jackets" },
        { label: "Vest", slug: "vest" },
      ],
    },
    {
      title: "Underwear and Loungewear",
      slug: "underwear-and-loungewear",
      items: [
        { label: "Boxers", slug: "boxers" },
        { label: "Briefs", slug: "briefs" },
        { label: "Undershirts", slug: "undershirts" },
        { label: "Loungewear Sets", slug: "loungewear-sets" },
      ],
    },
  ];

  return (
    <div
      className="bg-[#00000078] min-h-screen flex justify-center fixed top-0 left-0 right-0 z-50"
      onClick={() => props.setShowMenNavMenu(false)}
    >
      <div
        className="bg-white shadow-lg px-20 py-10 w-full flex gap-10 h-max"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Sophisticated Style, Unwavering Confidence
          </h2>
          <p className="text-lg mb-6 text-gray-800">
            Classic fashion tailored for the modern man who values
            sophistication and ease.
          </p>
          <hr className="text-gray-200 mb-5" />

          <div className="flex gap-12 text-sm text-blue-800 max-w-5xl">
            {sections.map((sec) => (
              <div key={sec.slug}>
                <h4 className="font-semibold text-lg mb-1">
                  <Link
                    href={`/shop/${categorySlug}/${sec.slug}`}
                    onClick={() => props.setShowMenNavMenu(false)}
                  >
                    {sec.title}:
                  </Link>
                </h4>
                <ul className="space-y-1">
                  {sec.items.map((it) => (
                    <li key={it.slug}>
                      <Link
                        href={`/shop/${categorySlug}/${sec.slug}/${it.slug}`}
                        onClick={() => props.setShowMenNavMenu(false)}
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

        <div className="w-[20rem] h-[30rem] relative">
          <Image
            src="https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Man+with+shoe.jpg"
            alt="Man with shoe"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default MenDropdown;
