import {
	AddTodolistAction,
	ChangeTodolistFilterAction,
	ChangeTodolistTitleAction,
	FilterType,
	RemoveTodolistAction,
	TodolistsActionType,
} from '../../types/Todolists'

export const changeTodolistTitle = (id: string, title: string): ChangeTodolistTitleAction => {
	return {
		type: TodolistsActionType.CHANGE_TODOLIST_TITLE,
		payload: {
			id,
			title,
		},
	}
}

export const changeTodolistFilter = (id: string, filter: FilterType): ChangeTodolistFilterAction => {
	return {
		type: TodolistsActionType.CHANGE_TODOLIST_FILTER,
		payload: { id, filter },
	}
}

export const addTodolist = (id: string, title: string): AddTodolistAction => {
	return {
		type: TodolistsActionType.ADD_TODOLIST,
		payload: {
			id,
			title,
		},
	}
}

export const removeTodolist = (payload: string): RemoveTodolistAction => {
	return {
		type: TodolistsActionType.REMOVE_TODOLIST,
		payload,
	}
}
