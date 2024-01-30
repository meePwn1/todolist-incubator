import { todosService } from '../../services/todosService'
import { RequestStatusType } from '../../types/IApp'
import { IThunk } from '../../types/IThunk'
import {
	AddTodolistAction,
	ChangeTodolistFilterAction,
	ChangeTodolistTitleAction,
	FilterValuesType,
	ITodo,
	RemoveTodolistAction,
	SetEntityStatusTodolistAction,
	SetTodolistAction,
	TodolistActionTypes,
} from '../../types/ITodo'
import { appErrorHandler, serverErrorHandler } from '../../utils/errorHandler'
import { setAppStatusAction } from './appActions'

export const addTodolistAction = (data: ITodo): AddTodolistAction => {
	return {
		type: TodolistActionTypes.ADD_TODOLIST,
		data,
	}
}

export const setEntityStatusTodolistAction = (
	id: string,
	status: RequestStatusType
): SetEntityStatusTodolistAction => {
	return {
		type: TodolistActionTypes.SET_ENTITY_STATUS_TODOLIST,
		status,
		id,
	}
}

export const removeTodolistAction = (id: string): RemoveTodolistAction => {
	return {
		type: TodolistActionTypes.REMOVE_TODOLIST,
		id,
	}
}

export const changeTodolistTitleAction = (
	id: string,
	title: string
): ChangeTodolistTitleAction => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_TITLE,
		id,
		title,
	}
}

export const changeTodolistFilterAction = (
	id: string,
	filter: FilterValuesType
): ChangeTodolistFilterAction => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_FILTER,
		id,
		filter,
	}
}

export const setTodolistAction = (data: ITodo[]): SetTodolistAction => {
	return {
		type: TodolistActionTypes.SET_TODOLIST,
		data,
	}
}

export const fetchTodolist = (): IThunk => dispatch => {
	dispatch(setAppStatusAction('loading'))
	todosService
		.getTodos()
		.then(res => {
			dispatch(setTodolistAction(res.data))
			dispatch(setAppStatusAction('succeeded'))
		})
		.catch(err => serverErrorHandler(err, dispatch))
}

export const addTodoThunk =
	(title: string): IThunk =>
	dispatch => {
		setAppStatusAction('loading')
		todosService
			.createTodo({ title })
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(addTodolistAction(res.data.data.item))
					dispatch(setAppStatusAction('succeeded'))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

export const updateTitleTodoThunk =
	(id: string, title: string): IThunk =>
	dispatch => {
		todosService
			.updateTodo(id, { title })
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(changeTodolistTitleAction(id, title))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

export const removeTodoThunk =
	(id: string): IThunk =>
	dispatch => {
		dispatch(setEntityStatusTodolistAction(id, 'loading'))
		todosService
			.deleteTodo(id)
			.then(() => {
				dispatch(removeTodolistAction(id))
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}
