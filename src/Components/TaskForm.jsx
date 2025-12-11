import React, { useState } from "react";
import { useTasks } from "../Context/TaskContext";

export default function TaskForm({onClose}) {
  const { addTask } = useTasks();

  const [task, setTask] = useState({
    name: "",
    priority: "",
    deadline: "",
  });

  const handleCreate=()=>{
    if(!task.name || !task.deadline || !task.priority){
      alert('Please fill the required fields')
    }
    addTask({...task , stage:0})
    setTask({ name: "", priority: "", deadline: "" });
    onClose()
  }

  return (
  
    <div className=" p-5 mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Create New Task
      </h2>

      <div className="flex flex-col gap-4">
        
        <input
          placeholder="Task Name"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />

        <select
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="">Priority</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        <input
          type="date"
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all cursor-pointer"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
