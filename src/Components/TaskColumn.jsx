import React from 'react'
import { useDispatch } from 'react-redux'
import TaskCard from './TaskCard'
import { updateTask } from '../redux/taskSlice'

export default function TaskColumn({stage , tasks ,stageIndex, onDeleteClick, onTrashShow}) {

  const dispatch = useDispatch()

  const allowDrop = (e) => {
    e.preventDefault();
  }

    const handleDrop = (e) => {
    const taskData = e.dataTransfer.getData("taskData");
    const fromStage = Number(e.dataTransfer.getData("taskStage"));

    if (taskData && fromStage !== stageIndex) {
      const task = JSON.parse(taskData)
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        dispatch(updateTask({ taskId: task.id, updates: { stage: stageIndex }, userId: user.id }))
      }
    }

    onTrashShow && onTrashShow();
  };

  const handleDragEnter = () => onTrashShow && onTrashShow();

  return (
    <>
   <div className="w-full sm:w-80 lg:w-[380px] min-h-[400px] sm:min-h-[600px] bg-gray-50 rounded-2xl shadow-md flex flex-col"
        onDragOver={allowDrop}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
   >
      <h3 className={`flex justify-center items-center text-sm sm:text-base lg:text-lg text-white font-semibold mb-3 ${stage === 'Done' ? 'bg-green-500' : stage === 'Ongoing' ? 'bg-blue-900' : stage === 'Backlog' ? 'bg-red-300' : 'bg-purple-300'} h-[50px] rounded-tl-lg rounded-tr-lg`}>
        {stage}
      </h3>
      <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 overflow-y-auto flex-1">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-xs sm:text-sm">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} onDeleteClick={onDeleteClick} />)
        )}
      </div>
    </div>
    </>
  )
}
