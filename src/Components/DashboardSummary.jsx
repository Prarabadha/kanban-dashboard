import { Link } from "react-router-dom"

export default function DashboardSummary({ totalTasks, completed, pending }) {

  return (
    <div className="bg-gradient-to-br from-blue-200 via-white to-blue-100 p-8 text-white mx-auto shadow-2xl h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
           
            Kanban Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex gap-3">
        <Link to='/kanbanboard'>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold">
          Go To Board
        </div>
        </Link>
        <Link to='/'>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold">
          Logout
        </div>
        </Link>
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
    </div>
  )
}