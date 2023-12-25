import { v1 } from 'uuid'
import { TodolistType } from '../../App'
import {
	TodolistActionCreator,
	TodolistActionTypes,
} from '../actions/todolistActions'

export const todolistReducer = (
	state: TodolistType[],
	action: TodolistActionCreator
): TodolistType[] => {
	switch (action.type) {
		case TodolistActionTypes.ADD_TODOLIST:
			return [...state, { id: v1(), title: action.payload, filter: 'all' }]
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
			throw new Error('Incorrect type')
	}
}
