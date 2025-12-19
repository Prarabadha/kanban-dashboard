import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../Components/TaskForm";
import TaskColumn from "../Components/TaskColumn";
import Modal from "../Components/Modal";
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { fetchTasks, deleteTask } from "../redux/taskSlice";



export default function KanbanBoard() {
  const[isOpen,setIsOpen]=useState(false)
  const[deleteConfirmation,setDeleteConfirmation]=useState({isOpen:false,taskId:null,taskName:null})
  const[isTrashHovered,setIsTrashHovered]=useState(false)
  const[showTrash,setShowTrash]=useState(false)

  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.tasks)
  const stages = ["Backlog", "To Do", "Ongoing", "Done"]

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      dispatch(fetchTasks(user.id))
    }
  }, [dispatch])

  const handleDeleteTask = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      dispatch(deleteTask({ taskId: deleteConfirmation.taskId, userId: user.id }))
      setDeleteConfirmation({isOpen:false,taskId:null,taskName:null})
    }
  }


  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-br from-blue-200 via-white to-blue-100 px-4 sm:px-6 lg:px-8">
   
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <TaskForm onClose={()=> setIsOpen(false)}/>
      </Modal>

      <div className="flex flex-col sm:flex-row justify-between items-center w-full  max-w-[1600px] gap-4 sm:gap-0">
    <div  className="flex justify-center items-center gap-3">
       <Link to='/dashboard'>
         <FaArrowLeft className="w-6 h-6 sm:w-[30px] sm:h-[30px] mt-2"/>
       </Link>
      <div className="text-xl sm:text-2xl lg:text-[30px] font-bold mt-2">Kanban Board</div>
    </div>

   <div>
     <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 cursor-pointer mt-4 whitespace-nowrap"
      >
        + Create Task
      </button>
   </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 justify-center mt-8 w-full max-w-[1600px]">
        {stages.map((stage, index) => (
          <TaskColumn
            key={stage}
            stage={stage}
            stageIndex={index}
            tasks={tasks.filter((t) => t.stage === index)}
            onDeleteClick={(taskId, taskName) => setDeleteConfirmation({isOpen:true, taskId, taskName})}
            onTrashShow={() => setShowTrash(true)}
          />
        ))}
      </div>

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
            const taskData = e.dataTransfer.getData("taskData");
            if (taskData) {
              const task = JSON.parse(taskData);
              setDeleteConfirmation({ isOpen: true, taskId: task.id, taskName: task.name });
            }
            setShowTrash(false);
            setIsTrashHovered(false);
          }}
        >
          <MdDelete className="w-12 h-12 text-white" />
        </div>
      )}

      <Modal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({isOpen:false,taskId:null,taskName:null})}>
        <div className="bg-white p-6 rounded-lg  w-[500px] ">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Task?</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete "<strong>{deleteConfirmation.taskName}</strong>"? This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setDeleteConfirmation({isOpen:false,taskId:null,taskName:null})}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTask}
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
