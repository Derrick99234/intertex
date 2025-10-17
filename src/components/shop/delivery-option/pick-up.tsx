import React from "react";

function Pickup() {
  return (
    <div className="max-w-xl mx- text-sm">
      {/* <div className="flex justify-between items-center my-4 text-sm">
        <h3 className="font-bold">Pick-Up Fee</h3>
        <span className="font-semibold">$50.00</span>
      </div>
      <hr className="h-[2px] bg-gray-300 max-w-xl mx-auto text-gray-300" /> */}
      <h3 className="my-5">Find the nearest store location close to you</h3>
      <select className="border-none w-full bg-gray-100 py-2 px-4 rounded-md outline-none">
        <option value="">Select a store location</option>
        <option>17, Kayodo Asrikawe street, Ikosi Ketu, Lagos Nigeria</option>
        <option>123, Victoria Island, Lagos Nigeria</option>
        <option>456, Lekki Phase 1, Lagos Nigeria</option>
        <option>789, Ikeja GRA, Lagos Nigeria</option>
        <option>101, Surulere, Lagos Nigeria</option>
      </select>
      {/* <button className="bg-secondary block text-white py-2 px-4 rounded-md mt-4">
        Find store close to you on map
      </button> */}
      <h3 className="my-5">Your Contact Phone Number</h3>
      <hr className="h-[2px] bg-gray-300 max-w-xl mx-auto text-gray-300" />
      <p className="mt-3 py-2 bg-gray-200 px-4">090368244706</p>
      <button className="bg-secondary text-white py-2 px-14 rounded-md mt-4">
        Add
      </button>
    </div>
  );
}

export default Pickup;
