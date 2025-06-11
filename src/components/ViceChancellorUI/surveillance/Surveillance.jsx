import { useState } from "react";
import { Bell, Search, Filter, X } from "lucide-react";

export default function Surveillance() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="p-6 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-semibold">Surveillance</h1>
        <button onClick={() => setShowFilter(true)} className="flex items-center text-blue-500 text-base">
          Filter <Filter className="ml-2" size={20} />
        </button>
      </div>
      <p className="text-base text-gray-600 mt-2">Total: 160</p>
      
      <div className="relative mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-12 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Search className="absolute right-4 top-3 text-gray-400" size={18} />
      </div>
      
      <p className="mt-6 text-purple-600 font-semibold text-lg">🔹 Component 6</p>
      
      <div className="flex justify-between items-center mt-3 text-lg font-medium">
        <span>DT39HHFB</span>
        <Bell className="text-gray-600" size={20} />
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
        <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-blue-500">Filter by</h2>
              <button onClick={() => setShowFilter(false)}><X size={20} /></button>
            </div>
            <div className="mt-4">
              <p className="font-medium">Campus zone</p>
              {['Central zone', 'North zone', 'South zone', 'West zone', 'East zone'].map((zone) => (
                <div key={zone} className="flex items-center mt-2">
                  <input type="checkbox" className="mr-2" />
                  <span>{zone}</span>
                </div>
              ))}
              <p className="font-medium mt-4">Campus name</p>
              {['Ambedkar DSEU Shakarpur Campus', 'Bhai Parmanand DSEU Shakarpur', 'DSEU Dwarka Campus', 'Other'].map((name) => (
                <div key={name} className="flex items-center mt-2">
                  <input type="checkbox" className="mr-2" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg">Clear all</button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
