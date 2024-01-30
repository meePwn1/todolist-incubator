import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store/reducers'
import { AppAction } from './IApp'
import { TasksAction } from './ITask'
import { TodolistAction } from './ITodo'

type RootAction = TodolistAction | TasksAction | AppAction

export type IThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	RootAction
>
