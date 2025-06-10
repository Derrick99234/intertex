import React from "react";

interface ElevatedStyleProps {
  hedaer: string;
  image1: string;
  image2: string;
  content: string;
  buttonText: string;
  buttonLink: string;
}

function ElevatedStyle({
  hedaer,
  image1,
  image2,
  content,
  buttonText,
  buttonLink,
}: ElevatedStyleProps) {
  return (
    <section className="h-screen">
      <div className="relative bg-[#152F24] h-[50vh] pt-10">
        <h2 className="text-center text-white font-semibold font-marcellus text-4xl">
          Elevated Style for the Modern Man
        </h2>
        <div className="absolute"></div>
      </div>
    </section>
  );
}

export default ElevatedStyle;
