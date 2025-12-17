import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DashboardSummary from '../Components/DashboardSummary'
import { fetchTasks } from '../redux/taskSlice'

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { tasks } = useSelector((state) => state.tasks)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) navigate('/')
  }, [navigate])

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      const user = JSON.parse(userStr)
      dispatch(fetchTasks(user.id))
    }
  }, [dispatch])

  const totalTasks = tasks.length
  const completed = tasks.filter((t) => t.stage === 3).length
  const pending = tasks.filter((t) => t.stage !== 3).length

  return (
    <DashboardSummary totalTasks={totalTasks} completed={completed} pending={pending}/>
  )
}
