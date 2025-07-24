function ProductDetails() {
  return (
    <div className="overflow-y-scroll max-h-96">
      <label className="text-sm font-medium my-3 block">Product Name</label>
      <input
        type="text"
        placeholder="What is the name of this product?"
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />
      <label className="text-sm font-medium my-3 block">Product Price</label>
      <input
        type="text"
        placeholder="How much is this product?"
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />
      <label className="text-sm font-medium my-3 block">Materials</label>
      <input
        type="text"
        placeholder="Enter product material"
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />
      <label className="text-sm font-medium my-3 block">Process</label>
      <input
        type="text"
        placeholder="Enter product process"
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />
      <label className="text-sm font-medium my-3 block">
        Offer on this productss
      </label>
      <select
        name="offer"
        id="offer"
        className="border rounded px-3 py-2 w-full outline-none border-gray-200"
      >
        <option value="sales">Sales</option>
        <option value="sales">Sales</option>
        <option value="sales">Sales</option>
        <option value="sales">Sales</option>
      </select>
      <label className="text-sm font-medium my-3 block">
        Product Description
      </label>
      <textarea
        placeholder="Enter product description"
        className="w-full py-3 outline-none rounded h-36 px-4 text-xs border border-gray-200"
      />
      <label className="text-sm font-medium my-3 block">Product features</label>
      <textarea
        placeholder="Enter product features"
        className="w-full py-3 outline-none rounded h-36 px-4 text-xs border border-gray-200"
      />
    </div>
  );
}

export default ProductDetails;
