import { Link, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function DashboardSummary({ totalTasks, completed, pending }) {
  const navigate = useNavigate();

  // Prepare data for pie chart
  const pieData = [
    { name: "Completed", value: completed, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
  ];

  // Prepare data for bar chart
  const barData = [
    { name: "Total", value: totalTasks, fill: "#3b82f6" },
    { name: "Pending", value: pending, fill: "#f59e0b" },
    { name: "Completed", value: completed, fill: "#10b981" },
  ];

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 via-white to-blue-100 p-8 text-white mx-auto shadow-2xl h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Kanban Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/kanbanboard">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold">
              Go To Board
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-200 text-sm font-medium">Total Tasks</p>
              <p className="text-4xl font-bold mt-2">{totalTasks}</p>
            </div>
            <div className="bg-blue-500/30 p-3 rounded-xl">
              <span className="text-2xl">📋</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-blue-200">
            <span>All your tasks</span>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-200 text-sm font-medium">Pending</p>
              <p className="text-4xl font-bold mt-2">{pending}</p>
            </div>
            <div className="bg-amber-500/30 p-3 rounded-xl">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-amber-200">
            <span>Keep pushing!</span>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-200 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold mt-2">{completed}</p>
            </div>
            <div className="bg-emerald-500/30 p-3 rounded-xl">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-200">
            <span className="text-emerald-400">↑</span>
            <span className="ml-1">Great progress!</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Task Status Distribution
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-lg font-normal text-gray-800">Pending</div>
            <div className="w-5 h-5 bg-[#f59e0b] ml-[26px]"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-lg font-normal text-gray-800">Completed</div>
            <div className="w-5 h-5 bg-[#10b981]"></div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Task Statistics
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Count">
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2">
             <div className="text-lg font-normal text-gray-800">Total</div>
            <div className="w-5 h-5 bg-[#3b82f6]"></div>
            <div className="text-lg font-normal text-gray-800">Pending</div>
            <div className="w-5 h-5 bg-[#f59e0b]"></div>
              <div className="text-lg font-normal text-gray-800">Completed</div>
            <div className="w-5 h-5 bg-[#10b981]"></div>
             
          </div>
      
        </div>
      </div>
    </div>
  );
}
