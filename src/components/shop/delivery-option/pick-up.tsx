import React from "react";

function Pickup() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center my-4">
        <h3 className="font-bold text-lg">Pick-Up Fee</h3>
        <span className="font-semibold">$50.00</span>
      </div>
      <hr className="h-[2px] text-2xl bg-gray-300 max-w-xl mx-auto text-gray-300" />
      <h3 className="text-lg my-5 mt-7">
        Find the nearest store location close to you
      </h3>
      <hr className="h-[2px] text-2xl bg-gray-300 max-w-xl mx-auto text-gray-300" />
      <select className="mt-7 border-none w-full bg-gray-100 py-2 px-4 rounded-md outline-none">
        <option value="" disabled selected>
          Select a store location
        </option>
        <option>17, Kayodo Asrikawe street, Ikosi Ketu, Lagos Nigeria</option>
        <option>123, Victoria Island, Lagos Nigeria</option>
        <option>456, Lekki Phase 1, Lagos Nigeria</option>
        <option>789, Ikeja GRA, Lagos Nigeria</option>
        <option>101, Surulere, Lagos Nigeria</option>
      </select>
      <button className="bg-secondary block text-white py-2 px-4 rounded-md mt-4">
        Find store close to you on map
      </button>
      <h3 className="text-lg my-5 mt-7">Your Contact Phone Number</h3>
      <hr className="h-[2px] text-2xl bg-gray-300 max-w-xl mx-auto text-gray-300" />
      <p className="mt-7 py-2 bg-gray-200 px-4">090368244706</p>
      <button className="bg-secondary text-white py-2 px-14 rounded-md mt-4">
        Add
      </button>
    </div>
  );
}

export default Pickup;
