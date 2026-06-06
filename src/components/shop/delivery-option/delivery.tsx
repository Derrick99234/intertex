"use client";
import { useEffect, useState } from "react";
import AddressForm from "./add-billing-information";
import AddressSelectionCard from "./address-selection-card";
import { API_BASE_URL } from "@/lib/constants";
import { authFetch } from "@/lib/auth-fetch";

function Delivery({
  deliveryInformation,
  setDeliveryInformation,
}: {
  deliveryInformation: any;
  setDeliveryInformation: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressData, setAddressData] = useState({
    _id: "",
    fullName: "",
    deliveryAddress: "",
    location: "",
    phoneNumber: "",
    isDefault: false,
    additionalInformation: "",
    secondPhoneNumber: "",
    user: {
      _id: "",
      email: "",
      fullName: "",
    },
    region: "",
    city: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const handleSave = async (formData: any) => {
    const method = isEditMode ? "PATCH" : "POST";
    const endpoint = isEditMode
      ? `/billing-information/${editingAddressId}`
      : "/billing-information";

    const res = await authFetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        deliveryAddress: formData.deliveryAddress,
        phoneNumber: formData.phoneNumber,
        secondPhoneNumber: formData.secondPhoneNumber,
        additionalInformation: formData.additionalInformation,
        isDefault: formData.isDefault,
        user: addressData.user._id,
      }),
    });

    if (!res.ok) {
      alert("Failed to save address");
      return;
    }

    // Refresh addresses
    const updated = await authFetch("/billing-information");

    const data = await updated.json();

    const mapped = data.map((item: any) => ({
      ...item,
      location: `${item.city} - ${item.region}`,
    }));

    setAddresses(mapped);

    setIsModalOpen(false);
    setIsEditMode(false);
    setIsCreateMode(false);
    setEditingAddressId(null);
  };

  const [addresses, setAddresses] = useState([
    {
      _id: "",
      fullName: "",
      deliveryAddress: "",
      location: "",
      phoneNumber: "",
      isDefault: false,
      additionalInformation: "",
      secondPhoneNumber: "",
      user: {
        _id: "",
        email: "",
        fullName: "",
      },
      region: "",
      city: "",
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const fetchBilingInfo = async () => {
      const res = await authFetch("/billing-information");
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

      const deliveryAddress = address?.deliveryAddress + address?.location;
      setDeliveryInformation({
        deliveryAddress,
        phoneNumber: address?.phoneNumber,
      });
    };
    fetchBilingInfo();
  }, []);

  const handleCancel = () => setIsModalOpen(false);

  const handleFinalSelect = (id: string | null) => {
    const address = addresses.find((item) => item._id === id);
    if (address) {
      setAddressData(address);
      const deliveryAddress = address?.deliveryAddress + address?.location;
      setDeliveryInformation({
        deliveryAddress,
        phoneNumber: address?.phoneNumber,
      });
    }
    handleCancel();
  };

  const handleEdit = (id: string) => {
    const addressToEdit = addresses.find((addr) => addr._id === id);
    if (!addressToEdit) return;

    setAddressData(addressToEdit); // preload form
    setEditingAddressId(id);
    setIsCreateMode(false);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setAddressData({
      _id: "",
      fullName: "",
      deliveryAddress: "",
      location: "",
      phoneNumber: "",
      isDefault: false,
      additionalInformation: "",
      secondPhoneNumber: "",
      region: "",
      city: "",
      user: addressData.user,
    });

    setEditingAddressId(null);
    setIsEditMode(false);
    setIsCreateMode(true);
    // setIsModalOpen(true);
  };

  return (
    <div className="max-w-lg mx-auto">
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
      {(isEditMode || isCreateMode) && (
        <AddressForm
          initialData={addressData}
          onCancel={() => {
            setIsEditMode(false);
            setIsCreateMode(false);
            setEditingAddressId(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Delivery;
