import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/taskSlice";

export default function EditTaskModal({onClose , taskData}) {

  const dispatch = useDispatch();


  const [task, setTask] = useState({
    name: "",
    priority: "",
    deadline: "",
  });

  const[error,setError]=useState({
    name:'',
    priority:'',
    deadline:''
  });

  useEffect(()=>{
   if(taskData){
    setTask({
    name:taskData.name,
    priority:taskData.priority,
    deadline:taskData.deadline
   })
   }
  },[taskData])

  const handleUpdate=()=>{
 
    const errorCheck={
      name:'',
      priority:'',
      deadline:''
    };

    let hasError=false;

    if(!task.name){
      errorCheck.name='Task name is required';
      hasError=true;
    }
    if(!task.priority){
      errorCheck.priority='Priority is required';
      hasError=true;
    }
    if(!task.deadline){
      errorCheck.deadline='Deadline is required';
      hasError=true;
    }

    setError(errorCheck);

    if(hasError) return;

    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      dispatch(updateTask({ taskId: taskData.id, updates: task, userId: user.id }))
      onClose()
    }
  }

  return (
  
    <div className="p-3 sm:p-5 mb-6 w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Edit Task
      </h2>

      <div className="flex flex-col gap-3 sm:gap-4">
        
        <input
          placeholder="Task Name"
          className="border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />

        { error.name && <p className="text-red-500 text-sm">{error.name}</p> }

        <select
          className="border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {error.priority && <p className="text-red-500 text-sm">{error.priority}</p>}

        <input
          type="date"
          className="border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 outline-none"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />

        {error.deadline && <p className="text-red-500 text-sm">{error.deadline}</p>}

        <button
          onClick={handleUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 text-sm sm:text-base rounded-lg transition-all cursor-pointer"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}
