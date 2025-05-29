"use client";
import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "What is INTERTEX?",
    answer:
      "INTERTEX is a leading fashion brand in Africa, offering premium quality, stylish, and affordable clothing for individuals who love to express themselves through fashion.",
  },
  {
    question: "Where is INTERTEX based?",
    answer:
      "We are proudly based in Africa, with a vision to redefine fashion across the continent and beyond.",
  },
  {
    question: "What type of clothing do you sell?",
    answer:
      "We offer a wide range of fashion pieces, including casual wear, corporate outfits, streetwear, luxury fashion, and stylish apparel for kids.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can shop directly on our website, social media platforms, or visit our physical stores (if available).",
  },
  {
    question: "Do you offer worldwide shipping?",
    answer:
      "Yes! We provide fast and reliable shipping across Africa and selected international locations.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, mobile money, and bank transfers.",
  },
  {
    question: "How do I know my size?",
    answer:
      "We provide a detailed size guide on our website to help you find the perfect fit.",
  },
  {
    question: "Do you offer custom designs?",
    answer:
      "Yes! We take special requests for custom-made outfits and bulk orders.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us via email, phone, or social media DMs, and our support team will be happy to assist you.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full md:w-[932.59px] md:h-[1235px] h-[900px] mx-auto mt-10 md:mb-20 mb-4 flex flex-col justify-between gap-8 p-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className=" ">
          <button
            className="w-full flex justify-between items-center text-left focus:outline-none "
            onClick={() => toggle(idx)}
          >
            <span className="font-bold text-sm md:text-2xl text-black font-['OpenSans']">
              {faq.question}
            </span>
            <span
              className={`transition-transform duration-200 ${
                openIndex === idx ? "rotate-180" : ""
              }`}
            >
              <Image
                src="/icons/arrow-down.png"
                alt="Toggle"
                width={24}
                height={24}
                className="md:w-[24px] md:h-[24px] w-[16px] h-[16px]"
              />
            </span>
          </button>
          {openIndex === idx && (
            <div className="mt-3 text-sm md:text-base text-[#222] font-normal font-['OpenSans']">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
