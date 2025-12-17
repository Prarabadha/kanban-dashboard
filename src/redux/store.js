import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { taskReducer } from './taskReducer'

const rootReducer = combineReducers({
  tasks: taskReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
