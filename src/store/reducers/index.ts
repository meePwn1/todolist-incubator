import { combineReducers } from 'redux'
import { tasksReducer } from './taskReducer'
import { todolistReducer } from './todolistReducer'

export const rootReducer = combineReducers({
	todos: todolistReducer,
	tasks: tasksReducer,
})

export type RootState = ReturnType<typeof rootReducer>
