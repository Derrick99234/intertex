import React from "react";

const steps = [
  {
    number: "1.",
    title: "Customer design/Idea:",
    description:
      "Present a tech pack, sketch, picture or a physical ready made sample along with the necessary information and we will bring design to reality",
  },
  {
    number: "2.",
    title: "Fabric Sourcing:",
    description:
      "We work with both local and international suppliers to acquire high-quality materials and assure that we stay below your specified price points. Lead times may be significantly shortened by choosing in-stock products.",
  },
  {
    number: "3.",
    title: "Pattern/Mold Making:",
    description:
      "Work with our expert pattern makers to achieve the features and fit of each style. Patterns are essentially the blueprint for all clothing items. Our pattern making process combines decades of expertise, cutting-edge CAD technology, and an in-house facility in Lagos, Nigeria.",
  },
  {
    number: "4.",
    title: "Sample Making:",
    description:
      "Our skilled sample makers hand cut and sew your garments with detail and precision. By creating samples of your clothing, we're able to test the fit and functionality before mass production.7 days for sample production",
  },
  {
    number: "5.",
    title: "Revisions",
    description:
      "We understand that perfecting your design is a process. INTERTEX offers flexible revision options to fine-tune every detail, ensuring that the final product aligns with your exact vision before moving into full production.",
  },
  {
    number: "6.",
    title: "Bulk Production:",
    description:
      "With your sample approved, we can begin pre-production. Placing your purchase order will initiate your first production run. 2~3 weeks for the bulk production depending on quantity",
  },
];

const MakeItSection = () => {
  return (
    <section className="py-14 px-2 sm:px-4 bg-[#fafafa]">
      <h2 className="text-center font-['Marcellus_SC'] font-bold mb-10 mt-2 text-2xl sm:text-3xl md:text-[33px]">
        How we make it
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-md p-6 flex flex-col items-start mx-auto w-full min-h-[340px] sm:w-[320px] sm:min-h-[380px] md:w-[369px] md:h-[443px] transition-colors duration-300 hover:bg-black group"
          >
            <div className="text-3xl font-['Marcellus_SC'] font-bold mb-2 group-hover:text-white transition-colors duration-300">{step.number}</div>
            <div className="text-[30px] font-['Marcellus_SC'] font-bold mb-2 capitalize group-hover:text-white transition-colors duration-300">
              {step.title}
            </div>
            <div className="text-[19px] text-[#152F24] font-normal leading-snug group-hover:text-white transition-colors duration-300">
              {step.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MakeItSection; 