import React from "react";

function AddNewProducts({
  setAddNewProduct,
}: {
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10"
      onClick={() => setAddNewProduct(false)}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg relative z-[1000]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="bg-secondary py-2 text-lg text-white text-center">
          Add New Products
        </h2>
        <div className="px-8">
          <h3 className="text-sm font-medium my-3">Categories</h3>
          <select
            name="categories"
            id="categories"
            className="border rounded px-3 py-2 w-full "
          >
            <option value="">Select a category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="accessories">Accessories</option>
          </select>
          <h3 className="text-sm font-medium my-3">Sub categories</h3>
          <select
            name="categories"
            id="categories"
            className="border rounded px-3 py-2 w-full "
          >
            <option value="">Select a subcategory</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="accessories">Accessories</option>
          </select>
          <h3 className="text-sm font-medium my-3">Types</h3>
          <select
            name="categories"
            id="categories"
            className="border rounded px-3 py-2 w-full "
          >
            <option value="">Select a types</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="accessories">Accessories</option>
          </select>
          <button
            className="w-full bg-secondary py-2 cursor-pointer text-lg text-white rounded-md text-center mt-6 mb-12"
            onClick={() => setAddNewProduct(false)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewProducts;
