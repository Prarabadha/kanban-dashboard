const API_URL = 'http://localhost:5000'

// Action types
export const TASKS_LOADING = 'TASKS_LOADING'
export const TASKS_LOADED = 'TASKS_LOADED'
export const TASKS_ERROR = 'TASKS_ERROR'
export const TASK_ADDED = 'TASK_ADDED'
export const TASK_UPDATED = 'TASK_UPDATED'
export const TASK_DELETED = 'TASK_DELETED'
export const CLEAR_TASKS = 'CLEAR_TASKS'

// Fetch tasks for a user
export const fetchTasks = (userId) => async (dispatch) => {
  dispatch({ type: TASKS_LOADING })
  try {
    const res = await fetch(`${API_URL}/tasks?userId=${userId}`)
    if (!res.ok) throw new Error('Failed to fetch tasks')
    const tasks = await res.json()
    dispatch({ type: TASKS_LOADED, payload: tasks })
  } catch (err) {
    dispatch({ type: TASKS_ERROR, payload: err.message })
  }
}

// Add a new task
export const addTask = (task, userId) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, userId }),
    })
    if (!res.ok) throw new Error('Failed to add task')
    const newTask = await res.json()
    dispatch({ type: TASK_ADDED, payload: newTask })
  } catch (err) {
    dispatch({ type: TASKS_ERROR, payload: err.message })
  }
}

// Update a task
export const updateTask = (taskId, updates, userId) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updates, userId }),
    })
    if (!res.ok) throw new Error('Failed to update task')
    const updated = await res.json()
    dispatch({ type: TASK_UPDATED, payload: updated })
  } catch (err) {
    dispatch({ type: TASKS_ERROR, payload: err.message })
  }
}

// Delete a task
export const deleteTask = (taskId, userId) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/tasks/${taskId}?userId=${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to delete task')
    dispatch({ type: TASK_DELETED, payload: taskId })
  } catch (err) {
    dispatch({ type: TASKS_ERROR, payload: err.message })
  }
}

// Clear tasks when user logs out
export const clearTasks = () => (dispatch) => {
  dispatch({ type: CLEAR_TASKS })
}
