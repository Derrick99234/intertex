import React from "react";
import Image from "next/image";
import Link from "next/link";

function KidDropdown(props: {
  setShowKidNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const categorySlug = "kids";

  const sections: {
    title: string;
    slug: string;
    items: { label: string; slug: string }[];
  }[] = [
    {
      title: "Baby Clothing",
      slug: "baby-clothing",
      items: [
        { label: "Onesies", slug: "onesies" },
        { label: "Rompers", slug: "rompers" },
        { label: "Baby Dresses", slug: "baby-dresses" },
        { label: "Knitwear", slug: "knitwear" },
      ],
    },
    {
      title: "Toddler and Kids",
      slug: "toddler-kids",
      items: [
        { label: "T-shirts", slug: "t-shirts" },
        { label: "Pants", slug: "pants" },
        { label: "Skirts", slug: "skirts" },
        { label: "Dresses", slug: "dresses" },
        { label: "Outerwear", slug: "outerwear" },
      ],
    },
    {
      title: "Sportswear: Kids",
      slug: "sportswear",
      items: [
        { label: "Kids’ Gym Clothes", slug: "kids-gym-clothes" },
        { label: "Activewear Sets", slug: "activewear-sets" },
        { label: "Comfortable Shoes", slug: "comfortable-shoes" },
      ],
    },
  ];

  return (
    <div
      className="bg-[#00000078] min-h-screen flex justify-center fixed top-0 left-0 right-0 z-50"
      onClick={() => props.setShowKidNavMenu(false)}
    >
      <div
        className="bg-white shadow-lg px-20 py-10 w-full flex gap-10 h-max"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Playful Style, Lasting Comfort
          </h2>
          <p className="text-lg mb-6 text-gray-800">
            Thoughtfully designed fashion for kids, combining durability,
            elegance, and effortless charm for every adventure.
          </p>
          <hr className="text-gray-200 mb-5" />

          <div className="flex gap-12 text-sm text-blue-800 max-w-5xl">
            {sections.map((section) => (
              <div key={section.slug}>
                <h4 className="font-semibold text-lg mb-1">
                  <Link href={`/shop/${categorySlug}/${section.slug}`}>
                    {section.title}
                  </Link>
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/shop/${categorySlug}/${section.slug}/${item.slug}`}
                        onClick={() => props.setShowKidNavMenu(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href={"/shop"}>Accessories</Link>
                  </li>
                  <li>
                    <Link href={"/our-factory"}>Our Factory</Link>
                  </li>
                  <li>
                    <Link href={"/our-stores"}>Our Stores</Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-[20rem] h-[30rem] relative">
          <Image
            src="https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/A+baby+girl.png"
            alt="A baby girl"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default KidDropdown;
