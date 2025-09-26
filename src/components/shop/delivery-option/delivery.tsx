function Delivery() {
  return (
    <div className="max-w-full mx-auto">
      <div className="flex justify-between items-center my-4">
        <h3 className="font-bold text-lg">Delivary Fee</h3>
        <span className="font-semibold">$50.00</span>
      </div>
      <hr className="h-[2px] bg-gray-300 max-w-xl mx-auto text-gray-300" />
      <h3 className="my-5 mt-7">Your Delivery Address</h3>
      <hr className="h-[2px] bg-gray-300 mx-auto text-gray-300" />
      <address className="mt-7">
        17, Kayodo Asrikawe street, Ikosi Ketu, Lagos Nigeria
      </address>
      <button className="bg-secondary text-white py-2 px-4 rounded-md mt-4">
        Change Address
      </button>
      <h3 className="my-5 mt-7">Your Contact Phone Number</h3>
      <hr className="h-[2px] bg-gray-300 max-w-xl mx-auto text-gray-300" />
      <p className="mt-7">090368244706</p>
      <button className="bg-secondary text-white py-2 px-14 rounded-md mt-4">
        Add
      </button>
    </div>
  );
}

export default Delivery;
