"use client";
import { useState } from "react";
import AddressForm from "./add-billing-information";
import AddressSelectionCard from "./address-selection-card";

const initialAddresses = [
  {
    id: "addr_001",
    fullName: "Olatunbosun Olashubomi",
    deliveryLine: "32 seriki aro street under bridge ikeja lagos",
    location: "Ikeja (computer village) - Lagos",
    phoneNumber: "+234 7014189693",
    isDefault: true,
  },
  {
    id: "addr_002",
    fullName: "Jane Doe",
    deliveryLine: "15 Admiralty Way",
    location: "Lekki - Lagos",
    phoneNumber: "+234 8021234567",
    isDefault: false,
  },
];

function Delivery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressData, setAddressData] = useState(null);

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const [addresses, setAddresses] = useState(initialAddresses);
  // Initialize selected address with the default one
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialAddresses.find((a) => a.isDefault)?.id || null
  );

  const handleFinalSelect = (id: string | null) => {
    if (id) {
      console.log(`Address ID ${id} selected for checkout.`);
      // Proceed to the next step of the checkout process
    }
  };

  const handleEdit = (id: string) => {
    console.log(`Editing address: ${id}`);
    // In a real app, you'd open the AddressFormModal here
  };

  const handleAdd = () => {
    console.log("Adding new address...");
    // In a real app, you'd open the AddressFormModal here
  };

  const handleCancel = () => {
    console.log("Selection canceled, returning to previous screen.");
    // Logic to close the card or return to the previous view
  };
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center my-4 text-sm">
        <h3 className="flex justify-between text-gray-600">Delivary Fee</h3>
        <span className="font-semibold">$50.00</span>
      </div>
      {/* <input
        type="text"
        placeholder="Delivery Address"
        className="my-4 block border-b-2 border-gray-400 outline-none w-full py-2 px-4"
      /> */}
      <h3 className="bg-gray-300 text-sm py-1 rounded-t-md px-2">
        Olatunbosun Olashubomi
      </h3>
      <address className="text-gray-500 border-gray-300 border-2 p-2 text-sm rounded-b-md">
        17, Kayodo Asrikawe street, Ikosi Ketu, Lagos Nigeria
      </address>
      <button
        className="bg-secondary text-white py-2 px-4 rounded-md mt-4 text-sm cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Change Address
      </button>
      {isModalOpen && (
        <AddressSelectionCard
          onCancel={() => setIsModalOpen(false)}
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onSelect={setSelectedAddressId} // Update local state on click
          onEdit={handleEdit}
          onAdd={handleAdd}
          onFinalSelect={handleFinalSelect}
        />
      )}
    </div>
  );
}

export default Delivery;
