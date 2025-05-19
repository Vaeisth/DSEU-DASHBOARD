import { Outlet } from "react-router-dom";
import Navbar from "../components/ViceChancellorUI/Reusable/Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <main className="pt-20 pb-8 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
