"use client";
import { useEffect, useState } from "react";
import AddressForm from "./add-billing-information";
import AddressSelectionCard from "./address-selection-card";
import { API_BASE_URL } from "@/lib/constants";

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
  const [addressData, setAddressData] = useState({
    _id: "",
    fullName: "",
    deliveryAddress: "",
    location: "",
    phoneNumber: "",
    isDefault: false,
  });

  const handleSave = () => {
    setIsModalOpen(false);
  };

  const [addresses, setAddresses] = useState([
    {
      _id: "",
      fullName: "",
      deliveryAddress: "",
      location: "",
      phoneNumber: "",
      isDefault: false,
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  useEffect(() => {
    const fetchBilingInfo = async () => {
      const res = await fetch(`${API_BASE_URL}/billing-information`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("intertex-token")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      const updatedData = data.map((item: any) => {
        return {
          ...item,
          location: `${item.city} - ${item.region}`,
        };
      });

      const address = updatedData.find((item: any) => item.isDefault === true);
      setAddressData(address);
      setSelectedAddressId(address._id);
      setAddresses(updatedData);
    };
    fetchBilingInfo();
  }, []);

  const handleCancel = () => setIsModalOpen(false);

  const handleFinalSelect = (id: string | null) => {
    const address = addresses.find((item) => item._id === id);
    if (address) {
      setAddressData(address);
    }
    handleCancel();
  };

  const handleEdit = (id: string) => {
    console.log(`Editing address: ${id}`);
    // In a real app, you'd open the AddressFormModal here
  };

  const handleAdd = () => {
    console.log("Adding new address...");
    // In a real app, you'd open the AddressFormModal here
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
        {addressData.fullName}
      </h3>
      <address className="text-gray-500 border-gray-300 border-2 p-2 text-sm rounded-b-md">
        {addressData.deliveryAddress + addressData.location}
      </address>
      <button
        className="bg-secondary text-white py-2 px-4 rounded-md mt-4 text-sm cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Change Address
      </button>
      {isModalOpen && (
        <AddressSelectionCard
          onCancel={handleCancel}
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
