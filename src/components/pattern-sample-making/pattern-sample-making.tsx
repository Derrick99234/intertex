import React from "react";

const PatternSampleMaking = () => {
  const sampleMakingPrices = [
    { style: "Pants", pattern: "$550", cutSew: "$275-$350" },
    { style: "Skirts", pattern: "$550", cutSew: "$275-$350" },
    { style: "Tops & Blouse", pattern: "$550", cutSew: "$275-$350" },
    { style: "Men shirts", pattern: "$550", cutSew: "$275-$350" },
    { style: "Dress", pattern: "$550", cutSew: "$275-$350" },
    { style: "Jackets", pattern: "$550", cutSew: "$275-$350" },
    { style: "Leggings", pattern: "$550", cutSew: "$275-$350" },
    { style: "T-shirts", pattern: "$550", cutSew: "$275-$350" },
    { style: "Tank tops", pattern: "$550", cutSew: "$275-$350" },
    { style: "Hoodies", pattern: "$550", cutSew: "$275-$350" },
    { style: "Plain sweat shirts", pattern: "$550", cutSew: "$275-$350" },
    { style: "One pc bathing suit", pattern: "$550", cutSew: "$275-$350" },
    { style: "2 pcs bathing suit", pattern: "$550", cutSew: "$275-$350" },
  ];

  const miscellaneousFees = [
    { item: "Yield", price: "$550" },
    { item: "Yield", price: "$550" },
    { item: "Pattern copy", price: "$550" },
    { item: "Graded spec sheet", price: "$550" },
    { item: "Fitting", price: "$550" },
    { item: "Pattern corrections", price: "$550" },
  ];

  const paymentProductionTerms = [
    { term: "Development", description: "Paid in full in advance" },
    {
      term: "Production",
      description: "50% deposit, balance before shipping after inspection",
    },
    {
      term: "Claims",
      description: "5 days allowed for all claims on samples & production",
    },
    {
      term: "Penalty",
      description:
        "Interest charged at 10% for defaulted payment terms; collection fees for non-payment billed to customer",
    },
    { term: "Pattern charges", description: "Rebated on production orders" },
    {
      term: "MOQ",
      description:
        "Domestic Production: 125+ pcs, Overseas Production: 300+ pieces",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white px-2 sm:px-4 md:px-8">
      <h2 className="text-center text-[#091697] text-2xl sm:text-3xl md:text-[33px] font-['Marcellus_SC'] mb-8 sm:mb-10 md:mb-12 uppercase ">
        1ST PATTERN & SAMPLE MAKING PRICING
      </h2>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-base sm:text-lg font-bold text-[#152F24] mb-4 sm:mb-6 ">
          Sample Making Prices
        </h2>
        <div className="overflow-x-auto mb-8 sm:mb-12">
          <table className="min-w-full bg-white border-collapse text-xs sm:text-sm">
            <thead>
              <tr className=" text-left text-gray-700 font-bold uppercase text-xs sm:text-sm leading-normal">
                <th className="py-2 sm:py-3 px-2 sm:px-6 border border-gray-200">Style</th>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border border-gray-200">
                  1st Pattern
                </th>
                <th className="py-2 sm:py-3 px-2 sm:px-6 border border-gray-200">
                  Cut & Sew (Samples)
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs sm:text-sm font-light font-['Fira_Code']">
              {sampleMakingPrices.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border border-gray-200 whitespace-nowrap">
                    {row.style}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border border-gray-200 whitespace-nowrap">
                    {row.pattern}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-6 border border-gray-200 whitespace-nowrap">
                    {row.cutSew}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full mx-auto">
          <h2 className="text-base sm:text-lg font-bold text-[#152F24] mb-4 sm:mb-6">
            Miscellaneous Fees
          </h2>
          <div className="overflow-x-auto mb-8 sm:mb-12">
            <table className="min-w-full bg-white border-collapse text-xs sm:text-sm">
              <thead>
                <tr className=" text-left text-gray-700 font-bold uppercase text-xs sm:text-sm leading-normal">
                  <th className="py-2 px-2 border border-gray-200">Items</th>
                  <th className="py-2 px-2 border border-gray-200">Price</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-xs sm:text-sm font-light font-['Fira_Code']">
                {miscellaneousFees.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-2 border border-gray-200 whitespace-nowrap">
                      {row.item}
                    </td>
                    <td className="py-2 px-2 border border-gray-200 whitespace-nowrap">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-[#152F24] mb-4 sm:mb-6 ">
            Payment & Production Terms
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse text-xs sm:text-sm">
              <thead>
                <tr className=" text-left text-gray-700 font-bold uppercase text-xs sm:text-sm leading-normal">
                  <th className="py-2 px-2 border border-gray-200">Terms</th>
                  <th className="py-2 px-2 border border-gray-200">
                    Pattern corrections
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-xs sm:text-sm font-light font-['Fira_Code']">
                {paymentProductionTerms.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-2 border border-gray-200 whitespace-normal break-words max-w-[120px] sm:max-w-[180px] md:max-w-[220px]">
                      {row.term}
                    </td>
                    <td className="py-2 px-2 border border-gray-200 whitespace-normal break-words max-w-[200px] sm:max-w-[350px] md:max-w-[500px]">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatternSampleMaking;
