const Sidebar = () => {
    return (
      <aside className="w-64 bg-white shadow-lg h-screen p-4">
        <h2 className="text-xl font-bold text-blue-700">DSEU</h2>
        <ul className="mt-4 space-y-4">
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Dashboard
          </li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Attendance
          </li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Approvalsss
          </li>
        </ul>
      </aside>
    );
  };
  
  export default Sidebar;
  