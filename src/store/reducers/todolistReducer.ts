import { TodolistType } from '../../App'
import {
	TodolistActionCreator,
	TodolistActionTypes,
} from '../actions/todolistActions'

const initialState: TodolistType[] = []

export const todolistReducer = (
	state = initialState,
	action: TodolistActionCreator
): TodolistType[] => {
	switch (action.type) {
		case TodolistActionTypes.ADD_TODOLIST:
			return [
				{ id: action.payload.id, title: action.payload.title, filter: 'all' },
				...state,
			]
		case TodolistActionTypes.REMOVE_TODOLIST:
			return state.filter(el => el.id !== action.payload)
		case TodolistActionTypes.CHANGE_TODOLIST_TITLE:
			return state.map(el =>
				el.id === action.payload.id
					? { ...el, title: action.payload.title }
					: el
			)
		case TodolistActionTypes.CHANGE_TODOLIST_FILTER:
			return state.map(el =>
				el.id === action.payload.id
					? { ...el, filter: action.payload.filter }
					: el
			)
		default:
			return state
	}
}
