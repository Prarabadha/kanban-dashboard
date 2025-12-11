import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardSummary from '../Components/DashboardSummary';
import { useTasks } from '../Context/TaskContext';

export default function Dashboard() {
    const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, []);

     const {tasks} = useTasks()
  
      const totalTasks = tasks.length;
      const completed = tasks.filter((t) => t.stage === 3).length;
  const pending = tasks.filter((t) => t.stage !== 3).length;
  

  return (
    <DashboardSummary totalTasks={totalTasks} completed={completed} pending={pending}/>
  )
}
