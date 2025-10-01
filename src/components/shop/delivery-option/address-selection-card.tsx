// components/AddressSelectionCard.tsx

import React from "react";

// --- Types ---

interface Address {
  id: string;
  fullName: string;
  deliveryLine: string;
  location: string; // Combined City - Region
  phoneNumber: string;
  isDefault: boolean;
}

interface AddressSelectionCardProps {
  addresses: Address[];
  selectedAddressId: string | null;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  onFinalSelect: (id: string | null) => void;
}

// --- Component ---

const AddressSelectionCard: React.FC<AddressSelectionCardProps> = ({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onAdd,
  onCancel,
  onFinalSelect,
}) => {
  // Use the currently selected ID for the final selection
  const handleSelectClick = () => {
    onFinalSelect(selectedAddressId);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 bg-opacity-75">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-4">
            <span className="text-secondary mr-2">✓</span> 1. CUSTOMER ADDRESS
          </h2>
        </header>

        {/* Address Book Title */}
        <h3 className="text-sm font-bold text-gray-700 mb-4">
          ADDRESS BOOK ({addresses.length})
        </h3>

        {/* Address List */}
        <div className="space-y-4 mb-6">
          {addresses.map((address) => (
            // Individual Address Item
            <div
              key={address.id}
              onClick={() => onSelect(address.id)}
              className={`
              p-4 border-2 rounded-lg cursor-pointer transition duration-200
              ${
                selectedAddressId === address.id
                  ? "border-secondary bg-secondary/5"
                  : "border-gray-200 hover:border-secondary/50"
              }
            `}
            >
              <div className="flex justify-between items-start">
                {/* Address Details */}
                <div className="flex items-center space-x-3">
                  {/* Custom Radio/Selector Circle */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      selectedAddressId === address.id
                        ? "border-secondary"
                        : "border-gray-400"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedAddressId === address.id ? "bg-secondary" : ""
                      }`}
                    />
                  </div>

                  {/* Text Block */}
                  <div>
                    <div className="flex items-center font-semibold text-gray-800">
                      {address.fullName}
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.deliveryLine} | {address.location}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {address.phoneNumber}
                    </p>

                    {address.isDefault && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-sm">
                        DEFAULT ADDRESS
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card selection when clicking edit
                    onEdit(address.id);
                  }}
                  className="flex items-center text-sm text-secondary hover:text-secondary/60 transition duration-150"
                >
                  Edit <span className="ml-1">✏️</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Address Link */}
        <button
          onClick={onAdd}
          className="flex items-center text-secondary font-semibold hover:text-secondary/60 transition duration-150 mb-8"
        >
          <span className="text-xl mr-2">+</span> Add address
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="text-gray-600 font-semibold px-6 py-3 rounded-md hover:text-gray-800 transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSelectClick}
            disabled={!selectedAddressId}
            className={`
            font-bold px-6 py-3 rounded-md shadow-md transition duration-150
            ${
              selectedAddressId
                ? "bg-secondary hover:bg-secondary/60 cursor-pointer text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
          >
            Select address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSelectionCard;
