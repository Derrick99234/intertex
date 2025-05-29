import Header from "@/components/header/header";
import HeroPage from "@/components/hero/hero-page";
import AboutHeroSection from "@/components/about-hero/about-hero-section";
import MissionVisionSection from "@/components/mission-vision/mission-vision-section";
import ShowcaseSection from "@/components/showcase/showcase-section";
import Image from "next/image";
import About from "./about/page";

export default function Home() {
  return (
    <>
      <HeroPage />
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h2>Hello world its been so long i code</h2>
      </div> */}
    </>
  );
}
