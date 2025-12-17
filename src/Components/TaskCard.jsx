import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import Modal from "./Modal";
import EditTaskModal from '../Components/EditTaskModal'
import { updateTask } from '../redux/taskActions'


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
      dispatch(updateTask(task.id, { stage: newStage }, user.id))
    }
  }


  return (
    <div draggable onDragStart={handleDragStart} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <EditTaskModal onClose={()=>setIsOpen(false)} taskData={task}/>
      </Modal>
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-gray-800">{task.name}</h4>

        <span
          className={`h-3 w-3 rounded-full ${priorityColors[task.priority]}`}
        ></span>
      </div>

      <p className="text-xs text-gray-500 mt-1">Deadline: {task.deadline}</p>

      <div className="flex mt-4 gap-2 justify-end">
        <button
          disabled={task.stage === 0}
          onClick={() => handleMoveStage(task.stage - 1)}
          className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-30 cursor-pointer" 
        >
          ◀
        </button>

        <button
          disabled={task.stage === 3}
          onClick={() => handleMoveStage(task.stage + 1)}
          className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-30 cursor-pointer"
        >
          ▶
        </button>
         
         <div className="flex gap-1 mt-1">
          <MdModeEditOutline onClick={()=> {
          setIsOpen(true)
         }} className="text-blue-500 hover:bg-red-60 w-6 h-6 cursor-pointer"/>

        <MdDelete
          className="text-red-500 hover:bg-red-60 w-6 h-6 cursor-pointer"
          onClick={() => onDeleteClick && onDeleteClick(task.id, task.name)}
        />
         </div>
      </div>
    </div>
  );
}
