import { todosService } from '../../services/todosService'
import { IThunk } from '../../types/IThunk'
import { FilterValuesType, ITodo } from '../../types/ITodo'

export enum TodolistActionTypes {
	ADD_TODOLIST = 'ADD_TODOLIST',
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
	CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
	SET_TODOLIST = 'SET_TODOLIST',
}

export interface AddTodolistAction {
	type: TodolistActionTypes.ADD_TODOLIST
	id: string
	title: string
}

export interface RemoveTodolistAction {
	type: TodolistActionTypes.REMOVE_TODOLIST
	id: string
}

interface ChangeTodolistTitleAction {
	type: TodolistActionTypes.CHANGE_TODOLIST_TITLE
	id: string
	title: string
}

interface ChangeTodolistFilterAction {
	type: TodolistActionTypes.CHANGE_TODOLIST_FILTER
	id: string
	filter: FilterValuesType
}
export interface SetTodolistAction {
	type: TodolistActionTypes.SET_TODOLIST
	data: ITodo[]
}

export type TodolistAction =
	| AddTodolistAction
	| RemoveTodolistAction
	| ChangeTodolistTitleAction
	| ChangeTodolistFilterAction
	| SetTodolistAction

export const addTodolistAction = (
	id: string,
	title: string
): AddTodolistAction => {
	return {
		type: TodolistActionTypes.ADD_TODOLIST,
		id,
		title,
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

export const fetchTodolist = (): IThunk => async dispatch => {
	const { data } = await todosService.getTodos()
	dispatch(setTodolistAction(data))
}
