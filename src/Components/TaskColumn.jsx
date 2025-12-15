import React from 'react'
import TaskCard from './TaskCard'
import { useTasks } from '../Context/TaskContext';

export default function TaskColumn({stage , tasks ,stageIndex}) {

  const {moveStage , setShowTrash} = useTasks();

  const allowDrop = (e) => {
    e.preventDefault();
  }

    const handleDrop = (e) => {
    const name = e.dataTransfer.getData("taskName");
    const fromStage = Number(e.dataTransfer.getData("taskStage"));

    if (fromStage !== stageIndex) {
      moveStage(name, stageIndex);
    }

    setShowTrash(false);
  };

  const handleDragEnter = () => setShowTrash(true);

  return (
    <>
   <div className="w-[400px] h-[600px] bg-gray-50 rounded-2xl shadow-md"
        onDragOver={allowDrop}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
   >
      <h3 className={`flex justify-center items-center text-lg text-white font-semibold mb-3 ${stage === 'Done' ? 'bg-green-500' : stage === 'Ongoing' ? 'bg-blue-900' : stage === 'Backlog' ? 'bg-red-300' : 'bg-purple-300'} h-[50px] rounded-tl-lg rounded-tr-lg`}>
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
