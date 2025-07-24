import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ElevatedStyleProps {
  header: string;
  image1: string;
  image2: string;
  content: string;
  buttonText: string;
  buttonLink: string;
}

function ElevatedStyle({
  header,
  image1,
  image2,
  content,
  buttonText,
  buttonLink,
}: ElevatedStyleProps) {
  return (
    <section className="min-h-[120vh] relative">
      <div className="bg-primary h-[50vh] pt-10">
        <h2 className="text-center text-white font-semibold font-marcellus text-4xl">
          Elevated Style for the Modern Man
        </h2>
      </div>
      <div className="absolute top-1/6 left-1/2 max-[1246px]:w-full text-center px-10 py-5 -translate-x-1/2  bg-white max-w-3xl">
        <h2 className="text-2xl text-secondary font-marcellus font-semibold mb-5">
          {header}
        </h2>
        <div className="flex gap-4">
          <Image
            src={image1}
            alt="Elevated style image 1"
            width={500}
            height={500}
            className=" w-1/2"
          />
          <Image
            src={image2}
            alt="Elevated style image 2"
            width={500}
            height={500}
            className="w-1/2"
          />
        </div>
        <p className="my-5 my">{content}</p>
        <Link
          href={buttonLink}
          className="inline-block mt-4 px-6 py-2 bg-primary text-white hover:bg-secondary-700 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

export default ElevatedStyle;
