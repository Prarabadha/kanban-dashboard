import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import Modal from "./Modal";
import EditTaskModal from '../Components/EditTaskModal'
import { updateTask } from '../redux/taskSlice'


export default function TaskCard({ task, onDeleteClick }) {
  const dispatch = useDispatch()
  const[isOpen,setIsOpen] = useState(false);

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskData", JSON.stringify(task));
    e.dataTransfer.setData("taskStage", task.stage);
  };

  const handleMoveStage = (newStage) => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      dispatch(updateTask({ taskId: task.id, updates: { stage: newStage }, userId: user.id }))
    }
  }


  return (
    <div draggable onDragStart={handleDragStart} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <EditTaskModal onClose={()=>setIsOpen(false)} taskData={task}/>
      </Modal>
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-semibold text-gray-800 text-sm sm:text-base break-words flex-1">{task.name}</h4>

        <span
          className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full flex-shrink-0 ${priorityColors[task.priority]}`}
        ></span>
      </div>

      <p className="text-xs text-gray-500 mt-1">Deadline: {task.deadline}</p>

      <div className="flex mt-3 sm:mt-4 gap-1 sm:gap-2 justify-end flex-wrap">
        <button
          disabled={task.stage === 0}
          onClick={() => handleMoveStage(task.stage - 1)}
          className="px-1.5 sm:px-2 py-1 text-xs sm:text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-30 cursor-pointer" 
        >
          ◀
        </button>

        <button
          disabled={task.stage === 3}
          onClick={() => handleMoveStage(task.stage + 1)}
          className="px-1.5 sm:px-2 py-1 text-xs sm:text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-30 cursor-pointer"
        >
          ▶
        </button>
         
         <div className="flex gap-1 mt-0.5 sm:mt-1">
          <MdModeEditOutline onClick={()=> {
          setIsOpen(true)
         }} className="text-blue-500 hover:bg-red-60 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-blue-700"/>

        <MdDelete
          className="text-red-500 hover:bg-red-60 w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:text-red-700"
          onClick={() => onDeleteClick && onDeleteClick(task.id, task.name)}
        />
         </div>
      </div>
    </div>
  );
}
