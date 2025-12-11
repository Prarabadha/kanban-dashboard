import React from 'react'
import TaskCard from './TaskCard'

export default function TaskColumn({stage , stageIndex , tasks}) {

  return (
    <>
   <div className="w-[400px] h-[600px] bg-gray-50 rounded-2xl shadow-md">
      <h3 className={`flex justify-center items-center text-lg text-white font-semibold mb-3 text-gray-700 ${stage === 'Done' ? 'bg-gray-400' : stage === 'Ongoing' ? 'bg-blue-900' : stage === 'Backlog' ? 'bg-red-300' : 'bg-purple-300'} h-[50px] rounded-tl-lg rounded-tr-lg`}>
        {stage}
      </h3>

      <div className="flex flex-col gap-3 p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.name} task={task} />)
        )}
      </div>
    </div>
    </>
  )
}
