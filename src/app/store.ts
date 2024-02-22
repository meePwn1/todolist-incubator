import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from 'app/appSlice'
import { tasksReducer } from 'features/TodolistsList/tasksSlice'
import { todolistsReducer } from 'features/TodolistsList/todolistsSlice'
import { authReducer } from 'features/auth/model/authSlice'

const rootReducer = combineReducers({
	todos: todolistsReducer,
	tasks: tasksReducer,
	app: appReducer,
	auth: authReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
