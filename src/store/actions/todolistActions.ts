import { FilterValuesType } from '../../App'

export enum TodolistActionTypes {
	ADD_TODOLIST = 'ADD_TODOLIST',
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
	CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
}

type AddTodolistAction = ReturnType<typeof addTodolist>
type RemoveTodolistAction = ReturnType<typeof removeTodolist>
type CHANGE_TODOLIST_TITLE = ReturnType<typeof changeTodolistTitle>
type CHANGE_TODOLIST_FILTER = ReturnType<typeof changeTodolistFilter>

export type TodolistActionCreator =
	| AddTodolistAction
	| RemoveTodolistAction
	| CHANGE_TODOLIST_TITLE
	| CHANGE_TODOLIST_FILTER

export const addTodolist = (title: string) => {
	return {
		type: TodolistActionTypes.ADD_TODOLIST,
		payload: title,
	} as const
}

export const removeTodolist = (id: string) => {
	return {
		type: TodolistActionTypes.REMOVE_TODOLIST,
		payload: id,
	} as const
}

export const changeTodolistTitle = (id: string, title: string) => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_TITLE,
		payload: {
			id,
			title,
		},
	} as const
}

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_FILTER,
		payload: {
			id,
			filter,
		},
	} as const
}
