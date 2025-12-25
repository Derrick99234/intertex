"use client";
import React, { useEffect, useState } from "react";

interface CustomerAddressData {
  _id?: string;
  fullName: string;
  deliveryAddress: string;
  phoneNumber: string;
  secondPhoneNumber: string;
  additionalInformation: string;
  region: string;
  city: string;
  isDefault: boolean;
}

interface AddressFormProps {
  initialData?: CustomerAddressData;
  onSave: (data: CustomerAddressData) => void;
  onCancel: () => void;
}

const DEFAULT_FORM: CustomerAddressData = {
  fullName: "",
  deliveryAddress: "",
  phoneNumber: "",
  secondPhoneNumber: "",
  additionalInformation: "",
  region: "",
  city: "",
  isDefault: false,
};

interface InputFieldProps {
  label: string;
  name: keyof CustomerAddressData;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary"
    />
  </div>
);

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CustomerAddressData>(
    initialData ? { ...DEFAULT_FORM, ...initialData } : DEFAULT_FORM
  );

  useEffect(() => {
    if (initialData) {
      setFormData({ ...DEFAULT_FORM, ...initialData });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-lg p-6 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {initialData ? "Edit Address" : "Add New Address"}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <InputField
            label="Second Phone Number"
            name="secondPhoneNumber"
            value={formData.secondPhoneNumber}
            onChange={handleChange}
          />
          <InputField
            label="Delivery Address"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
          />
          <InputField
            label="Additional Information"
            name="additionalInformation"
            value={formData.additionalInformation}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Region</label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select region</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select city</option>
                <option value="Ikeja">Ikeja</option>
                <option value="Lekki">Lekki</option>
              </select>
            </div>
          </div>

          {/* ✅ Default Address */}
          <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Set as default delivery address
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary cursor-pointer text-white px-6 py-2 rounded-md font-semibold hover:bg-secondary/80"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
