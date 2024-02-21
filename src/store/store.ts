import { ThunkAction, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from './slices/appSlice'
import { authReducer } from './slices/authSlice'
import { tasksReducer } from './slices/tasksSlice'
import { todolistsReducer } from './slices/todolistsSlice'

const rootReducer = combineReducers({
	todos: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type IThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>
