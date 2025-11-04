import { AlertTriangleIcon, ArrowRight, Check, LoaderIcon, Plus, UserCheck } from 'lucide-react'
import React, { useState } from 'react'
import Tasks from './Tasks';
import { Link } from 'react-router-dom';

const Overview = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design landing page", status: "In Progress", priority: "High" },
    { id: 2, title: "Fix authentication bug", status: "Pending", priority: "Medium" },
    { id: 3, title: "Update user dashboard", status: "Completed", priority: "Low" },
    ]);
  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between w-full items-start lg:items-center">
          <div>
            <h2 className='text-2xl lg:text-3xl font-semibold text-gray-800'>Task Overview</h2>
            <p className="text-sm text-gray-500 mt-1 w-[70%]">Track your team's progress and performance</p>
          </div>
          <button className={`bg-[#0D70FC] hover:bg-[#0A5BC4] transition-colors rounded-full lg:rounded-lg lg:px-5 p-4 lg:py-3 font-medium text-sm lg:text-base cursor-pointer text-white flex gap-2 items-center shadow-md hover:shadow-lg`}>
            <UserCheck size={18} /> <span className='lg:block hidden sm:block'>New Task</span>
          </button>
        </div>
        
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {/* Completed Tasks Card */}
          <div className="bg-white shadow-lg p-5 rounded-xl flex flex-col gap-4 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-medium text-gray-600">Completed</h2>
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                +12% this week
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-500 p-2 rounded-full flex items-center justify-center w-10 h-10">
                <Check className="text-white" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === "Completed").length}</p>
                <p className="text-xs text-gray-500">Tasks completed</p>
              </div>
            </div>
          </div>
          
          {/* In Progress Card */}
          <div className="bg-white shadow-lg p-5 rounded-xl flex flex-col gap-4 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-medium text-gray-600">In Progress</h2>
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Active
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 p-2 rounded-full flex items-center justify-center w-10 h-10">
                <LoaderIcon className="text-white" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === "In Progress").length}</p>
                <p className="text-xs text-gray-500">Tasks in progress</p>
              </div>
            </div>
          </div>
          
          {/* Pending/Overdue Card */}
          <div className="bg-white shadow-lg p-5 rounded-xl flex flex-col gap-4 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-medium text-gray-600">Pending</h2>
              <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                Attention needed
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-500 p-2 rounded-full flex items-center justify-center w-10 h-10">
                <AlertTriangleIcon className="text-white" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{tasks.filter(t => t.status === "Pending").length}</p>
                <p className="text-xs text-gray-500">Tasks pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Tasks isSmall={true}/>
      </div>
    </div>
  )
}

export default Overview