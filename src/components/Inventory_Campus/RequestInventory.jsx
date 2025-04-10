// components/RequestInventory.js


export default function RequestInventory() {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Request Inventory</h2>
          <div className="text-sm text-gray-600">
            <p>Date: {date}</p>
            <p>Time: {time}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow space-y-6">
          {/* Send To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send to:
            </label>
            <div className="flex items-center border rounded px-4 py-2">
              <img
                src="https://i.pravatar.cc/32"
                alt="dept"
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="text-gray-800 font-medium">
                Central Department
              </span>
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Item details</h3>

            <input
              type="text"
              placeholder="Item name"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <select className="w-full border px-4 py-2 rounded text-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
              <option>Select Item type</option>
              <option>Stationery</option>
              <option>Electronic</option>
              <option>Furniture</option>
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Description"
              rows={3}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
