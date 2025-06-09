import { useQuery } from "@tanstack/react-query";
import Loader from "../UI/Loader";
import { getAllIssuedItems } from "../../utils/apiservice";

const AllIssuedItems = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllIssuedItems,
    queryKey: ["all-issued-items"],
    staleTime: 7 * 60 * 1000,
  });

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (isLoading) return <Loader />;

  if (!data || data.length === 0)
    return (
      <div className="text-center text-gray-500 text-base py-6">
        No issued items found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center">
        All Issued Items
      </h1>

      {data.map((req) => (
        <div
          key={req.request_id}
          className="bg-white border border-gray-200 rounded-xl shadow-md"
        >
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <h3 className="text-lg font-semibold text-gray-800">
              #{req.request_id} – {req.campus_name}
            </h3>
          </div>

          <div className="px-6 py-4 text-gray-700 text-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <p>
                <span className="font-medium">Requested:</span>{" "}
                {formatDate(req.date_of_request)}
              </p>
              <p>
                <span className="font-medium">Approved:</span>{" "}
                {formatDate(req.date_of_approval)}
              </p>
            </div>

            <div>
              <p className="font-medium mb-1">Issued Items:</p>
              <ul className="list-disc pl-5 space-y-1">
                {req.issued.map((item, i) => (
                  <li key={i}>
                    <span className="font-medium">{item.item_name}</span> – Qty:{" "}
                    {item.qty}, Type: {item.Item_Type}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllIssuedItems;
