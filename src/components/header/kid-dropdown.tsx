import React from "react";
import Image from "next/image";

function KidDropdown(props: {
  setShowKidMenNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="bg-[#00000078] min-h-screen flex justify-center fixed top-0 left-0 right-0 z-50"
      onClick={() => props.setShowKidMenNavMenu(false)}
    >
      <div className="bg-white shadow-lg px-20 py-10 w-full flex gap-10 h-max">
        <div className="flex-1">
          <h2 className="text-  4xl font-bold text-gray-800 mb-2">
            Sophisticated Style, Unwavering Confidence
          </h2>
          <p className="text-lg mb-6 text-gray-800">
            Classic fashion tailored for the modern man who values
            sophistication and ease.
          </p>
          <hr className="text-gray-200 mb-5" />
          <div className="flex gap-12 text-sm text-blue-800 max-w-5xl">
            <div>
              <h4 className="font-semibold text-lg mb-1">Casual Wear:</h4>
              <ul className="space-y-1">
                <li>T-shirts</li>
                <li>Polos</li>
                <li>Sweatshirts</li>
                <li>Hoodies</li>
                <li>Denim Jeans</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Formal Wear:</h4>
              <ul className="space-y-1">
                <li>Dress Shirts</li>
                <li>Trousers</li>
                <li>Business Attire</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Sports Wear:</h4>
              <ul className="space-y-1">
                <li>Joggers</li>
                <li>Shorts</li>
                <li>Gym Wear</li>
                <li>Athleisure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Outerwear:</h4>
              <ul className="space-y-1">
                <li>Jackets</li>
                <li>Vest</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">
                Underwear and Loungewear:
              </h4>
              <ul className="space-y-1">
                <li>Boxers</li>
                <li>Briefs</li>
                <li>Undershirts</li>
                <li>Loungewear Sets</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-[20rem] h-[30rem] relative">
          <Image
            src="https://intertex-storage.s3.eu-north-1.amazonaws.com/Website+images/Landing+page/6206d9efd0941c39c61032b51f538ef9edade1ec.png"
            alt="Man with shoe"
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
