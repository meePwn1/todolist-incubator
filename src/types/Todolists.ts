export type FilterType = 'All' | 'Active' | 'Completed'

export interface ITodolist {
	id: string
	title: string
	filter: FilterType
}

export enum TodolistsActionType {
	CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
	ADD_TODOLIST = 'ADD_TODOLIST',
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
}

export interface ChangeTodolistTitleAction {
	type: TodolistsActionType.CHANGE_TODOLIST_TITLE
	payload: {
		id: string
		title: string
	}
}

export interface AddTodolistAction {
	type: TodolistsActionType.ADD_TODOLIST
	payload: {
		id: string
		title: string
	}
}

export interface RemoveTodolistAction {
	type: TodolistsActionType.REMOVE_TODOLIST
	payload: string
}

export interface ChangeTodolistFilterAction {
	type: TodolistsActionType.CHANGE_TODOLIST_FILTER
	payload: {
		id: string
		filter: FilterType
	}
}

export type TodolistAction =
	| ChangeTodolistTitleAction
	| AddTodolistAction
	| RemoveTodolistAction
	| ChangeTodolistFilterAction
