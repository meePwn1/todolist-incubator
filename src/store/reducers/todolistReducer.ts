import { IEntityTodo } from '../../types/ITodo'
import { TodolistAction, TodolistActionTypes } from '../actions/todolistActions'

const initialState: IEntityTodo[] = []

export const todolistReducer = (
	state = initialState,
	action: TodolistAction
): IEntityTodo[] => {
	switch (action.type) {
		case TodolistActionTypes.ADD_TODOLIST:
			return state
		case TodolistActionTypes.REMOVE_TODOLIST:
			return state.filter(el => el.id !== action.id)
		case TodolistActionTypes.CHANGE_TODOLIST_TITLE:
			return state.map(el =>
				el.id === action.id ? { ...el, title: action.title } : el
			)
		case TodolistActionTypes.CHANGE_TODOLIST_FILTER:
			return state.map(el =>
				el.id === action.id ? { ...el, filter: action.filter } : el
			)
		case TodolistActionTypes.SET_TODOLIST: {
			return action.data.map(el => ({ ...el, filter: 'all' }))
		}
		default:
			return state
	}
}
