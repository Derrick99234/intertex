function Delivery() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center my-4 text-sm">
        <h3 className="flex justify-between text-gray-600">Delivary Fee</h3>
        <span className="font-semibold">$50.00</span>
      </div>
      <input
        type="text"
        placeholder="Delivery Address"
        className="my-4 block border-b-2 border-gray-400 outline-none w-full py-2 px-4"
      />
      <address className="text-gray-600 text-sm">
        17, Kayodo Asrikawe street, Ikosi Ketu, Lagos Nigeria
      </address>
      <button className="bg-secondary text-white py-2 px-4 rounded-md mt-4 text-sm cursor-pointer">
        Change Address
      </button>
      {/* <input
        type="text"
        placeholder="Your Contact Phone Number"
        className="my-4 block border-b-2 border-gray-400 outline-none w-full py-2 px-4"
      />
      <p className="mt-7 text-sm">090368244706</p>
      <button className="bg-secondary text-white py-2 px-14 rounded-md mt-4 text-sm cursor-pointer">
        Change Contact Info
      </button> */}
    </div>
  );
}

export default Delivery;
