import { combineReducers } from 'redux'
import { appReducer } from './appReducer/appReducer'
import { tasksReducer } from './taskReducer/taskReducer'
import { todolistReducer } from './todolistReducer/todolistReducer'

export const rootReducer = combineReducers({
	todos: todolistReducer,
	tasks: tasksReducer,
	app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>
