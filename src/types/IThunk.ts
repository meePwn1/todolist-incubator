import { ThunkAction } from 'redux-thunk'
import { TasksAction } from '../store/actions/tasksAction'
import { TodolistAction } from '../store/actions/todolistActions'
import { RootState } from '../store/reducers'

type RootAction = TodolistAction | TasksAction

export type IThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	RootAction
>
