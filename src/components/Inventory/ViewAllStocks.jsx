import { useQuery } from "@tanstack/react-query";
import { getAllStocks } from "../../utils/apiservice";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";

const ViewAllStocks = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: getAllStocks,
    queryKey: ["get-all-stocks"],
    staleTime: 5 * 60 * 1000,
  });

  if(isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 min-h-screen bg-[#f9f9f9]">
      <div className="rounded-xl overflow-hidden border border-gray-300 bg-white shadow-md">
        <div className="bg-[#1e293b] text-white px-6 py-3 text-3xl text-center font-semibold ">
          All Stocks
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-[#f1f5f9] text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">GEM ID</th>
                <th className="px-4 py-3">Ordered</th>
                <th className="px-4 py-3">Purchased</th>
                <th className="px-4 py-3">No. of items</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((stock) => (
                <tr
                  key={stock.gem_id}
                  className="border-t hover:bg-emerald-50 transition-colors hover:cursor-pointer"
                  onClick={() => navigate(`/inventory/stock/${stock.gem_id}`)}
                >
                  <td className="px-4 py-3 font-medium text-blue-600 capitalize">
                    {stock.vendor_name}
                  </td>
                  <td className="px-4 py-3 h-14 font-semibold">
                    {stock.gem_id}
                  </td>
                  <td className="px-4 py-3">{stock.date_of_order}</td>
                  <td className="px-4 py-3">{stock.date_of_purchase}</td>
                  <td className="px-4 py-3">{stock?.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAllStocks;
