"use client";
import Image from "next/image";
import React from "react";
import ElevatedStyle from "../elevated-styles";
import ShowcaseSection from "../showcase/showcase-section";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HeroPage() {
  const router = useRouter();
  return (
    <>
      <section className="relative grid grid-cols-[30rem_1fr_20rem] max-[1246px]:grid-cols-[1fr] max-[1246px]:min-h-[85vh] max-[1246px]:items-start bg-[#BFB2A2] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Image
          src={
            "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/elegant-man-suit+1.png"
          }
          alt="young elegant billionaire"
          width={490}
          className="bottom-0 left-0 absolute max-[1246px]:max-w-[15rem]"
          height={300}
        />
        <div className="text-center text-white flex justify-center items-center col-span-3 flex-col max-w-3xl pl-10 max-[1246px]:pl-0 ">
          <span className="font-bold text-3xl">The</span>
          <span className="text-[10rem] max-[1246px]:text-[4rem] block">
            1912
          </span>
          <span className="text-bold block text-3xl">Collections</span>
          <p className="text-xl max-[1246px]:text-sm">
            “Our suits are tailored for confidence — combining premium fabrics,{" "}
            <br className="max-[1246px]:hidden" />
            precise cuts, and timeless design to help you make a lasting <br />
            impression at every occasion.
          </p>
          <button
            className="text-white px-18 py-4 mt-5 bg-primary cursor-pointer"
            onClick={() => router.push("/shop")}
          >
            Shop Now
          </button>
        </div>
        <Image
          src={
            "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/young-african-businessman-classy-suit-removebg-preview+1.png"
          }
          className="bottom-0 right-0 absolute max-[1246px]:max-w-[12rem]"
          alt="young african billionaire"
          width={350}
          height={200}
        />
      </section>
      <section className="min-h-[50vh] py-16 bg-[#F2F2F2]">
        <h2 className="text-3xl text-secondary font-medium text-center mb-10">
          Explore our collections
        </h2>
        <div className="flex justify-center items-start gap-10 flex-wrap">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={
                "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Component+3.png"
              }
              width={300}
              height={300}
              alt="A man in brown suit"
            />
            <span className="text-secondary font-medium text-2xl block mt-2">
              MAN
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={
                "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Component+2.png"
              }
              width={300}
              height={300}
              alt="A black man in brown suit"
            />
            <span className="text-secondary font-medium text-2xl block mt-2">
              WOMAN
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={
                "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Group+2.png"
              }
              width={300}
              height={300}
              alt="A lady on glass dress for summer"
            />
            <span className="text-secondary font-medium text-2xl block mt-2">
              KID&#39;S
            </span>
          </div>
        </div>
      </section>
      <ElevatedStyle
        header="The ultimate online clothing store in Nigeria."
        image1={
          "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Frame+2085653576.png"
        }
        image2={
          "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Frame+2085653577.png"
        }
        content="Discover the perfect blend of style, quality, and affordability at INTERTEX. From trendy outfits to timeless classics, we bring you the best in fashion, delivered right to your doorstep. Shop with confidence and elevate your wardrobe effortlessly."
        buttonText="Explore Man Fashion"
        buttonLink="/shop/men"
      />
      <ElevatedStyle
        header="The ultimate onlinE clothing store in Nigeria."
        image1={
          "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/girl_on_pink_front.jpg"
        }
        image2={
          "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/girl_on_pink_back.jpg"
        }
        content="Discover the perfect blend of style, quality, and affordability at INTERTEX. From trendy outfits to timeless classics, we bring you the best in fashion, delivered right to your doorstep. Shop with confidence and elevate your wardrobe effortlessly."
        buttonText="Explore Woman Fashion"
        buttonLink="/shop/women"
      />
      <section className="min-h-screen flex justify-center items-center gap-14 max-[1246px]:p-4 p-8 max-[1246px]:flex-wrap">
        <div className="bg-light-blue w-1/2 max-[1240px]:w-full">
          <h2 className="text-4xl font-semibold text-white text-center pt-8">
            Made for KIDs
          </h2>
          <Image
            src={
              "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Bart_Simpson.png"
            }
            alt="Bart Simpson"
            width={500}
            height={500}
            className=""
          />
        </div>
        <div className="flex flex-col gap-8 items-center w-1/2 max-[1240px]:w-full">
          <div className="flex gap-4">
            <Image
              src={
                "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/A_kid_on_blue_jacket.jpg"
              }
              alt="A kid on blue jacket"
              width={500}
              height={500}
              className="max-h-[30rem] max-[1246px]:max-h-[16rem] flex-1/2"
            />
            <Image
              src={
                "https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/Kid_on_skate.png"
              }
              alt="A kid on skate"
              width={500}
              height={500}
              className="max-h-[30rem] max-[1246px]:max-h-[16rem] flex-1/2"
            />
          </div>
          <p className="text-center">
            Where comfort meets style. Thoughtfully designed, durable, and
            effortlessly chic fashion for little trendsetters. Crafted with
            premium fabrics and attention to detail, our collections ensure your
            child looks great and feels even better—every day, every adventure.
          </p>
          <Link
            href={"/shop/kids"}
            className="inline-block mt-4 px-6 py-2 bg-primary text-white hover:bg-secondary-700 transition-colors"
          >
            Explore Kids Fashion
          </Link>
        </div>
      </section>
      <section className="min-h-screen bg-primary p-14 text-center">
        <h2 className="text-4xl font-bold text-center text-white">
          Explore our Factory
        </h2>
        <iframe
          width="1240"
          height="615"
          src="https://www.youtube.com/embed/vxc9-kpjEfw?si=2o2RRuauONwB-nrw"
          title="YouTube video player"
          className="mx-auto mt-8 max-[1246px]:max-w-full"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          // referrerpolicy="strict-origin-when-cross-origin"
          // allowfullscreen
        ></iframe>
        <p className="text-center text-white mt-4 max-w-2xl mx-auto">
          Step inside our world of craftsmanship and innovation, where premium
          fabrics meet cutting-edge design. At INTERTEX, we combine tradition
          with modern techniques to create high-quality fashion that stands out.
          Experience the artistry behind every stitch!
        </p>
        <Link
          href={"/our-factory"}
          className="inline-block px-6 py-2 bg-white text-primary hover:bg-primary/90 hover:text-white mt-5 transition-colors"
        >
          Explore Our Factory
        </Link>
      </section>

      <ShowcaseSection />
    </>
  );
}

export default HeroPage;
