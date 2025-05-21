import Image from "next/image";
import React from "react";

function HeroPage() {
  return (
    <section className="relative grid grid-cols-[30rem_1fr_20rem] bg-[#BFB2A2] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        src={
          "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/elegant-man-suit+1.png"
        }
        alt="young elegant billionaire"
        width={490}
        className="bottom-0 left-0 absolute"
        height={300}
      />
      <div className="text-center text-white flex justify-center items-center flex-col col-span-3 max-w-3xl pl-10">
        <span className="font-bold text-3xl">The</span>
        <span className="text-[10rem] block ">1912</span>
        <span className="text-bold block text-3xl">Collections</span>
        <h1 className="text-xl">
          “Our suits are tailored for confidence — combining premium fabrics,{" "}
          <br />
          precise cuts, and timeless design to help you make a lasting <br />
          impression at every occasion.
        </h1>
        <button className="text-white px-18 py-4 mt-5 bg-[#152F24]">
          Shop Now
        </button>
      </div>
      <Image
        src={
          "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/young-african-businessman-classy-suit-removebg-preview+1.png"
        }
        className="bottom-0 right-0 absolute"
        alt="young african billionaire"
        width={350}
        height={200}
      />
    </section>
  );
}

export default HeroPage;
