import React from "react";

function Pickup() {
  return (
    <div className="max-w-xl mx- text-sm">
      <h3 className="my-5">Find the nearest store location close to you</h3>
      <select className="border-none w-full bg-gray-100 py-2 px-4 rounded-md outline-none">
        <option value="">Select a store location</option>
        <option
          value={
            "ONE SOURCE MART, Plot 12 Ligali Ayorinde Street, Victoria Island, Lagos."
          }
        >
          ONE SOURCE MART, Plot 12 Ligali Ayorinde Street, Victoria Island,
          Lagos.
        </option>
        <option value={"STORE 24 Ground Floor Top Mall Mandilas, Lagos Island"}>
          STORE 24 Ground Floor Top Mall Mandilas, Lagos Island
        </option>
        <option
          value={
            "Joas House by 2nd Rainbow Bus-stop, Opp. Forte-oil, Beside T-Time Lagos"
          }
        >
          Joas House by 2nd Rainbow Bus-stop, Opp. Forte-oil, Beside T-Time
          Lagos
        </option>
      </select>
      <input
        type="number"
        className="border-b-2 border-gray-200 w-full py-2 px-4 outline-none mt-5"
        placeholder="Your Contact phone number"
      />
    </div>
  );
}

export default Pickup;
