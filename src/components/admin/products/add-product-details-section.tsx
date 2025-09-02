function ProductDetails({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <div className="overflow-y-scroll max-h-96">
      <label className="text-sm font-medium my-3 block">Product Name</label>
      <input
        type="text"
        placeholder="What is the name of this product?"
        value={formData.productName}
        onChange={(e) =>
          setFormData({ ...formData, productName: e.target.value })
        }
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />

      <label className="text-sm font-medium my-3 block">Product Price</label>
      <input
        type="number"
        placeholder="How much is this product?"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />

      <label className="text-sm font-medium my-3 block">Materials</label>
      <input
        type="text"
        placeholder="Enter product material"
        value={formData.materials}
        onChange={(e) =>
          setFormData({ ...formData, materials: e.target.value })
        }
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />

      <label className="text-sm font-medium my-3 block">Process</label>
      <input
        type="text"
        placeholder="Enter product process"
        value={formData.process}
        onChange={(e) => setFormData({ ...formData, process: e.target.value })}
        className="w-full py-3 outline-none rounded px-4 text-xs border border-gray-200"
      />

      <label className="text-sm font-medium my-3 block">Offer</label>
      <select
        value={formData.offer}
        onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
        className="border rounded px-3 py-2 w-full outline-none border-gray-200"
      >
        <option value="">No Offer</option>
        <option value="sale">Sale</option>
        <option value="discount">Discount</option>
      </select>

      <label className="text-sm font-medium my-3 block">
        Product Description
      </label>
      <textarea
        placeholder="Enter product description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full py-3 outline-none rounded h-36 px-4 text-xs border border-gray-200"
      />

      <label className="text-sm font-medium my-3 block">Product features</label>
      <textarea
        placeholder="Enter product features"
        value={formData.features}
        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        className="w-full py-3 outline-none rounded h-36 px-4 text-xs border border-gray-200"
      />
    </div>
  );
}

export default ProductDetails;
