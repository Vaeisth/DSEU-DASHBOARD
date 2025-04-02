const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen pt-16 p-4 fixed left-0 top-0">

      <ul className="mt-[20px] space-y-4">
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          Dashboard
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          Attendance
        </li>
        <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
          Approvals
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
