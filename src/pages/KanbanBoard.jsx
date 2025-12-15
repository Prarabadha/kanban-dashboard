import React, { useState } from "react";
import { useTasks } from "../Context/TaskContext";
import TaskForm from "../Components/TaskForm";
import TaskColumn from "../Components/TaskColumn";
import Modal from "../Components/Modal";
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";



export default function KanbanBoard() {
  const[isOpen,setIsOpen]=useState(false)
  const[deleteConfirmation,setDeleteConfirmation]=useState({isOpen:false,taskName:null})
  const[isTrashHovered,setIsTrashHovered]=useState(false)

  const { tasks , showTrash , setShowTrash , deleteTask } = useTasks();
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];



  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-br from-blue-200 via-white to-blue-100">
   
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <TaskForm onClose={()=> setIsOpen(false)}/>
      </Modal>

      <div className="flex justify-between items-center w-[1650px]">
    <div  className="flex justify-center items-center gap-3">
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

      {/* Trash Bin - Bottom Right */}
      {showTrash && (
        <div
          className={`fixed bottom-8 right-8 w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isTrashHovered
              ? "bg-red-600 scale-110 shadow-2xl"
              : "bg-red-500 shadow-lg"
          } border-4 border-red-700`}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsTrashHovered(true)}
          onDragLeave={() => setIsTrashHovered(false)}
          onDrop={(e) => {
            e.preventDefault();
            const taskName = e.dataTransfer.getData("taskName");
            if (taskName) {
              setDeleteConfirmation({ isOpen: true, taskName });
            }
            setShowTrash(false);
            setIsTrashHovered(false);
          }}
        >
          <MdDelete className="w-12 h-12 text-white" />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({isOpen:false,taskName:null})}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] ">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Task?</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "<strong>{deleteConfirmation.taskName}</strong>"? This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setDeleteConfirmation({isOpen:false,taskName:null})}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteTask(deleteConfirmation.taskName);
                setDeleteConfirmation({isOpen:false,taskName:null});
              }}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white cursor-pointer font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>

  

  );
}
