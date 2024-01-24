export enum TodolistActionTypes {
	ADD_TODOLIST = 'ADD_TODOLIST',
	REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE',
	CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER',
	SET_TODOLIST = 'SET_TODOLIST',
}

export interface AddTodolistAction {
	type: TodolistActionTypes.ADD_TODOLIST
	data: ITodo
}

export interface RemoveTodolistAction {
	type: TodolistActionTypes.REMOVE_TODOLIST
	id: string
}

export interface ChangeTodolistTitleAction {
	type: TodolistActionTypes.CHANGE_TODOLIST_TITLE
	id: string
	title: string
}

export interface ChangeTodolistFilterAction {
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

export type FilterValuesType = 'all' | 'active' | 'completed'

export interface ITodo {
	id: string
	title: string
	addedDate: string
	order: number
}

export interface IEntityTodo extends ITodo {
	filter: FilterValuesType
}
