import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store/reducers'
import { AppAction } from './IApp'
import { AuthAction } from './IAuth'
import { TasksAction } from './ITask'
import { TodolistAction } from './ITodo'

type RootAction = TodolistAction | TasksAction | AppAction | AuthAction

export type IThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	RootAction
>
