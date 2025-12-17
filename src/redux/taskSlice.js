import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'http://localhost:5000'

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/tasks?userId=${userId}`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const tasks = await res.json()
      return tasks
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async ({ task, userId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, userId }),
      })
      if (!res.ok) throw new Error('Failed to add task')
      const newTask = await res.json()
      return newTask
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates, userId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, userId }),
      })
      if (!res.ok) throw new Error('Failed to update task')
      const updated = await res.json()
      return updated
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId, userId }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}?userId=${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) throw new Error('Failed to delete task')
      return taskId
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  tasks: [],
  loading: false,
  error: null,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = []
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add task
      .addCase(addTask.pending, (state) => {
        state.error = null
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export const { clearTasks } = taskSlice.actions
export default taskSlice.reducer
