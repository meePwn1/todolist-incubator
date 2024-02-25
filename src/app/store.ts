import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from 'app/app-slice'
import { tasksReducer } from 'features/TodolistsList/model/tasksSlice'
import { todolistsReducer } from 'features/TodolistsList/model/todolistsSlice'
import { authReducer } from 'features/auth/model/authSlice'

export const store = configureStore({
	reducer: {
		todos: todolistsReducer,
		tasks: tasksReducer,
		app: appReducer,
		auth: authReducer,
	},
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
