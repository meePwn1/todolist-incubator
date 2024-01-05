import { FilterValuesType } from '../../App'

export enum TodolistActionTypes {
	ADD_TODOLIST = 'ADD_TODOLIST',
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
	CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
}

export type AddTodolistAction = ReturnType<typeof addTodolistAction>
export type RemoveTodolistAction = ReturnType<typeof removeTodolistAction>
type CHANGE_TODOLIST_TITLE = ReturnType<typeof changeTodolistTitleAction>
type CHANGE_TODOLIST_FILTER = ReturnType<typeof changeTodolistFilterAction>

export type TodolistActionCreator =
	| AddTodolistAction
	| RemoveTodolistAction
	| CHANGE_TODOLIST_TITLE
	| CHANGE_TODOLIST_FILTER

export const addTodolistAction = (id: string, title: string) => {
	return {
		type: TodolistActionTypes.ADD_TODOLIST,
		payload: {
			id,
			title,
		},
	} as const
}

export const removeTodolistAction = (id: string) => {
	return {
		type: TodolistActionTypes.REMOVE_TODOLIST,
		payload: id,
	} as const
}

export const changeTodolistTitleAction = (id: string, title: string) => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_TITLE,
		payload: {
			id,
			title,
		},
	} as const
}

export const changeTodolistFilterAction = (
	id: string,
	filter: FilterValuesType
) => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_FILTER,
		payload: {
			id,
			filter,
		},
	} as const
}
