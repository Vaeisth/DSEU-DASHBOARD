import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createStock } from "../../utils/apiservice";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";
import { useNavigate } from "react-router-dom";

const CreateStock = () => {
  const [formData, setFormData] = useState({
    gem_id: "",
    vendor_name: "",
    date_of_order: "",
    date_of_purchase: "",
    items: [
      {
        item_name: "",
        item_type: "Consumable",
        item_quantity: 1,
        item_price: 100,
      },
    ],
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createStock,
    onSuccess: () => {
      showSuccessToast("Created stock successfully!");
      navigate("/inventory/dashboard");
    },
    onError: (error) => {
      showErrorToast("Error while creating stock");
      console.error(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];

    updatedItems[index][name] =
      name === "item_price" || name === "item_quantity" ? Number(value) : value;

    setFormData({ ...formData, items: updatedItems });
  };

  const validateForm = () => {
    if (!formData.gem_id.trim()) {
      showErrorToast("GEM ID is required");
      return false;
    }
    if (!formData.vendor_name.trim()) {
      showErrorToast("Vendor Name is required");
      return false;
    }
    if (!formData.date_of_order) {
      showErrorToast("Date of Order is required");
      return false;
    }
    if (!formData.date_of_purchase) {
      showErrorToast("Date of Purchase is required");
      return false;
    }
    for (let i = 0; i < formData.items.length; i++) {
      const item = formData.items[i];
      if (!item.item_name.trim()) {
        showErrorToast(`Item Name is required for item ${i + 1}`);
        return false;
      }
      if (
        Number(item.item_quantity) <= 0 ||
        isNaN(Number(item.item_quantity))
      ) {
        showErrorToast(
          `Item Quantity must be a positive number for item ${i + 1}`
        );
        return false;
      }
      if (Number(item.item_price) <= 0 || isNaN(Number(item.item_price))) {
        showErrorToast(
          `Item Price must be a positive number for item ${i + 1}`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log(formData);

    mutation.mutate(formData);
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="md:text-3xl sm:text-2xl text-xl font-bold mb-4 text-center mt-2 text-[#333]">
            Create Stock
          </h1>

          <div className="space-y-3">
            {/* GEM ID */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                GEM ID
              </label>
              <input
                type="text"
                name="gem_id"
                value={formData.gem_id}
                onChange={handleChange}
                placeholder="Enter GEM ID"
                className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Vendor Name */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Vendor Name
              </label>
              <input
                type="text"
                name="vendor_name"
                value={formData.vendor_name}
                onChange={handleChange}
                placeholder="Enter Vendor Name"
                className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Date of Order */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Date of Order
              </label>
              <input
                type="date"
                name="date_of_order"
                value={formData.date_of_order}
                onChange={handleChange}
                className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Date of Purchase */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Date of Purchase
              </label>
              <input
                type="date"
                name="date_of_purchase"
                value={formData.date_of_purchase}
                onChange={handleChange}
                className="peer w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Items */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Item Details
              </label>
              {formData.items.map((item, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    name="item_name"
                    value={item.item_name}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Item Name"
                    className="w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <select
                    name="item_type"
                    value={item.item_type}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Consumable">Consumable</option>
                    <option value="Non-Consumable">Non-Consumable</option>
                  </select>
                  {/* Quantity */}
                  <div className="flex gap-4 mt-4">
                    <div className="flex-1">
                      <label className="block text-md font-medium text-gray-700 mb-2">
                        Item Quantity
                      </label>
                      <input
                        type="number"
                        name="item_quantity"
                        value={item.item_quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Quantity"
                        className="w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-md font-medium text-gray-700 mb-2">
                        Item Price
                      </label>
                      <input
                        type="number"
                        name="item_price"
                        value={item.item_price}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Price"
                        className="w-full bg-transparent border-b border-gray-300 px-2 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-3">
              <button
                onClick={handleSubmit}
                disabled={mutation.isLoading}
                className={`px-4 py-2 rounded-md w-full cursor-pointer mx-2 mb-2
                ${
                  mutation.isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:shadow-sm hover:shadow-blue-400 hover:bg-white hover:border-blue-950 hover:text-blue-500"
                }`}
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStock;
