import { combineReducers } from 'redux'
import { tasksReducer } from './tasksReducer'
import { todolistsReducer } from './todolistsReducer'

export const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
})

export type RootState = ReturnType<typeof rootReducer>
