import React, { useState } from "react";

interface CustomerAddressData {
  firstName: string;
  lastName: string;
  phonePrefix: string;
  phoneNumber: string;
  additionalPhonePrefix: string;
  additionalPhoneNumber: string;
  deliveryAddress: string;
  additionalInformation: string;
  region: string;
  city: string;
}

interface AddressFormProps {
  onSave: (data: CustomerAddressData) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<CustomerAddressData>({
    firstName: "Olatunbosun",
    lastName: "Olashubomi",
    phonePrefix: "+234",
    phoneNumber: "7014189693",
    additionalPhonePrefix: "+234",
    additionalPhoneNumber: "",
    deliveryAddress: "32 seriki aro street under bridge ikeja lagos",
    additionalInformation: "",
    region: "Lagos",
    city: "Ikeja (computer village)",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const InputField: React.FC<{
    label: string;
    name: keyof CustomerAddressData;
    type?: string;
    placeholder?: string;
    readOnly?: boolean;
    isSelect?: boolean;
  }> = ({
    label,
    name,
    type = "text",
    placeholder = "",
    readOnly = false,
    isSelect = false,
  }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-500 mb-1">
        {label}
      </label>
      {isSelect ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white pr-8"
        >
          <option>{formData[name]}</option>
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 ${
            readOnly ? "bg-gray-100 text-gray-700" : ""
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 bg-opacity-75">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-6 max-h-3/4 overflow-y-scroll"
      >
        <section className="border border-gray-200 p-4 rounded-lg bg-white">
          <h4 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
            EDIT ADDRESS
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField label="First Name" name="firstName" />
            <InputField label="Last Name" name="lastName" />
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-1">
              <InputField label="Prefix" name="phonePrefix" readOnly />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <InputField label="Phone Number" name="phoneNumber" type="tel" />
            </div>

            <div className="col-span-1">
              <InputField
                label="Prefix"
                name="additionalPhonePrefix"
                readOnly
              />
            </div>
            <div className="col-span-3 sm:col-span-1">
              <InputField
                label="Additional Phone Number"
                name="additionalPhoneNumber"
                type="tel"
                placeholder="Enter your Additional Phone Number"
              />
            </div>
          </div>

          <div className="mb-4">
            <InputField label="Delivery Address" name="deliveryAddress" />
          </div>
        </section>

        <section>
          <InputField
            label="Additional Information"
            name="additionalInformation"
            placeholder="Enter Additional Information"
          />
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Region" name="region" isSelect />
            <InputField label="City" name="city" isSelect />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 font-semibold px-6 py-2 rounded-md hover:text-gray-800 transition duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary hover:bg-secondary/60 cursor-pointer text-white font-bold px-6 py-2 rounded-md shadow-md transition duration-150"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
