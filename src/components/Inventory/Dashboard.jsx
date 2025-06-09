import { useNavigate } from "react-router-dom";
import { PackagePlus, Boxes, ClipboardList, MailOpen } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      label: "Create Stock",
      icon: <PackagePlus className="w-8 h-8 text-white" />,
      route: "/inventory/create-stock",
      gradient: "from-blue-500 to-blue-700",
      desc: "To create a stock",
    },
    {
      label: "View All Stocks",
      icon: <Boxes className="w-8 h-8 text-white" />,
      route: "/inventory/view-stocks",
      gradient: "from-green-500 to-green-700",
      desc: "To view all stocks",
    },
    {
      label: "All Issued Items",
      icon: <ClipboardList className="w-8 h-8 text-white" />,
      route: "/inventory/issued-items",
      gradient: "from-orange-500 to-orange-700",
      desc: "To check the issued items",
    },
    {
      label: "All Requests",
      icon: <MailOpen className="w-8 h-8 text-white" />,
      route: "/inventory/incoming-requests",
      gradient: "from-purple-500 to-purple-700",
      desc: "To view all the incoming requests from college",
    },
  ];

  return (
    <div className="px-4 pt-5 md:pt-0 pb-10 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-600 to-blue-700 text-center drop-shadow-md md:my-20 mb-12">
        Central Stock Inventory
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl w-full">
        {cards.map((card) => (
          <div
            key={card.label}
            onClick={() => navigate(card.route)}
            className={`cursor-pointer bg-gradient-to-br ${card.gradient} rounded-2xl shadow-xl p-8 flex items-center justify-between hover:scale-[1.03] transition-transform duration-300`}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {card.label}
              </h2>
              <p className="text-white/90 text-sm">{card.desc}</p>
            </div>
            <div className="bg-white/20 p-4 rounded-full">{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
