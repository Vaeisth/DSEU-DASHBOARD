import { useQuery } from "@tanstack/react-query";
import { getAllStocks } from "../../utils/apiservice";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const ViewAllStocks = () => {
  const [loaderColor, setLoaderColor] = useState("text-blue-500");

  const { data, isLoading } = useQuery({
    queryFn: getAllStocks,
    queryKey: ["get-all-stocks"],
  });

  useEffect(() => {
    const colors = ["text-blue-500", "text-orange-500", "text-green-500"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setLoaderColor(colors[index]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div
        className={`text-xl font-semibold ${loaderColor} w-full min-h-[60vh] flex justify-center items-center`}
      >
        <LoaderCircle className="w-20 h-20 animate-spin transition-colors" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Stocks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((stock) => (
          <div
            key={stock.gem_id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              Vendor: {stock.vendor_name}
            </h3>
            <p className="text-sm text-gray-500">
              GEM ID: {stock.gem_id}
            </p>
            <p className="text-sm text-gray-500">
              Ordered: {stock.date_of_order}
            </p>
            <p className="text-sm text-gray-500">
              Purchased: {stock.date_of_purchase}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Added: {stock.date_of_adding}
            </p>

            <div className="border-t border-gray-300 pt-2 mt-2">
              <h4 className="font-medium text-gray-700">Items:</h4>
              {stock.items.map((item) => (
                <div
                  key={item.item_id}
                  className="mt-2 p-2 rounded-lg bg-gray-100"
                >
                  <p className="text-sm font-medium text-gray-800">
                    {item.item_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Type: {item.item_type}
                  </p>
                  <p className="text-xs text-gray-600">
                    Quantity: {item.item_quantity}
                  </p>
                  <p className="text-xs text-gray-600">
                    Price: ₹{item.item_price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllStocks;
