import React, { createContext, useContext, useEffect, useState } from 'react'

const TaskContext = createContext();

export const TaskProvider = ({children})=>{
 const[tasks,setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

 useEffect(()=>{
   localStorage.setItem('tasks',JSON.stringify(tasks))
 },[tasks])

 const addTask=(task)=>{
  setTasks([...tasks , task])
 }

 const updateTask=(updated)=>{
    const newItem = tasks.map((item)=> item.name === updated.name ? updated : item);
    setTasks(newItem)
 }

 const deleteTask=(name)=>{
    const newDeleteItem = tasks.filter((item)=> item.name !== name);
    setTasks(newDeleteItem)
 }

   const moveStage = (name, newStage) =>
    setTasks(
      tasks.map((t) =>
        t.name === name ? { ...t, stage: newStage } : t
      )
    );


 return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveStage }}>
      {children}
    </TaskContext.Provider>
 )
}

export const useTasks = ()=> useContext(TaskContext)

