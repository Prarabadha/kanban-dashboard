import React, { useState } from "react";
import { useTasks } from "../Context/TaskContext";
import TaskForm from "../Components/TaskForm";
import TaskColumn from "../Components/TaskColumn";
import Modal from "../Components/Modal";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";



export default function KanbanBoard() {
  const[isOpen,setIsOpen]=useState(false)
  const { tasks } = useTasks();
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];
  console.log(tasks)

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
   
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <TaskForm onClose={()=> setIsOpen(false)}/>
      </Modal>

      <div className="flex justify-between items-center w-[1650px]">
    <div className="flex justify-center items-center gap-3">
       <Link to='/dashboard'>
         <FaArrowLeft className="w-[30px] h-[30px] mt-2"/>
       </Link>
      <div className="text-[30px] font-bold mt-2">Kanban Board</div>
    </div>

   <div>
     <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer mt-4"
      >
        + Create Task
      </button>
   </div>
      </div>

      <div className="flex gap-5 justify-center mt-8">
        {stages.map((stage, index) => (
          <TaskColumn
            key={stage}
            stage={stage}
            stageIndex={index}
            tasks={tasks.filter((t) => t.stage === index)}
          />
        ))}
      </div>
    </div>
  );
}
