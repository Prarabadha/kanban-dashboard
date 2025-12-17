import {
  TASKS_LOADING,
  TASKS_LOADED,
  TASKS_ERROR,
  TASK_ADDED,
  TASK_UPDATED,
  TASK_DELETED,
  CLEAR_TASKS,
} from './taskActions'

const initialState = {
  tasks: [],
  loading: false,
  error: null,
}

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_LOADING:
      return { ...state, loading: true, error: null }
    case TASKS_LOADED:
      return { ...state, tasks: action.payload, loading: false }
    case TASKS_ERROR:
      return { ...state, loading: false, error: action.payload }
    case TASK_ADDED:
      return { ...state, tasks: [...state.tasks, action.payload] }
    case TASK_UPDATED:
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.payload.id ? action.payload : t)),
      }
    case TASK_DELETED:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      }
    case CLEAR_TASKS:
      return { ...state, tasks: [], error: null }
    default:
      return state
  }
}
