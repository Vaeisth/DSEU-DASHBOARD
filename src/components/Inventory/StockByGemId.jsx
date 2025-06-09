import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStockByGemID } from "../../utils/apiservice";
import Loader from "../UI/Loader";

const StockByGemId = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getStockByGemID(id),
    queryKey: ["stock-by-id", id],
    enabled: !!id,
    staleTime: 7 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;

  const {
    gem_id,
    vendor_name,
    date_of_order,
    date_of_purchase,
    date_of_adding,
    items,
  } = data || {};

  const totalItems =
    items?.reduce((sum, item) => sum + item.item_quantity, 0) || 0;
  const totalValue =
    items?.reduce(
      (sum, item) => sum + item.item_price * item.item_quantity,
      0
    ) || 0;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 max-w-lg mx-auto">
        <p className="text-gray-500 text-lg sm:text-xl md:text-2xl font-medium">
          Please provide a valid{" "}
          <span className="font-semibold text-blue-600">Gem ID</span>.
        </p>
      </div>
    );
  }

  const content = [
    { label: "Gem ID", value: gem_id },
    { label: "Vendor Name", value: vendor_name },
    { label: "Order Date", value: formatDate(date_of_order) },
    { label: "Added to System", value: formatDate(date_of_adding) },
    { label: "Purchase Date", value: formatDate(date_of_purchase) },
    { label: "Total Items", value: totalItems },
  ];

  return (
    <div className="bg-gray-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Stock Info
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-8 py-6 text-sm text-gray-800">
            {content?.map(({ label, value }, index) => (
              <div key={index} className="text-[16px] md:text-[17px]">
                <span className="font-semibold">{label}:</span> {value || "N/A"}
              </div>
            ))}
          </div>
        </div>

        {/* Item Details */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              Item Details
            </h2>
          </div>

          <div className="overflow-x-auto">
            {items && items.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-blue-100">
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <tr
                      key={item.item_id}
                      className={`hover:bg-blue-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {item.item_name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.item_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                          {item.item_quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-800">
                        ₹{item.item_price.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-blue-600">
                        ₹
                        {(item.item_price * item.item_quantity).toLocaleString(
                          "en-IN"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gradient-to-r from-blue-100 to-purple-100 border-t-2 border-blue-200">
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-right font-bold text-gray-800 text-lg"
                    >
                      Grand Total:
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600 text-xl">
                      ₹{totalValue.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockByGemId;
