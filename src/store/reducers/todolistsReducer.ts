import { v1 } from 'uuid'
import { ITodolist, TodolistAction, TodolistsActionType } from '../../types/Todolists'

export const todolistIDs = [v1(), v1()]

const initialState: ITodolist[] = [
	{ id: todolistIDs[0], title: 'What to learn', filter: 'All' },
	{ id: todolistIDs[1], title: 'What to buy', filter: 'All' },
]

export const todolistsReducer = (state = initialState, action: TodolistAction): ITodolist[] => {
	switch (action.type) {
		case TodolistsActionType.CHANGE_TODOLIST_TITLE:
			return state.map(el => (el.id === action.payload.id ? { ...el, title: action.payload.title } : el))
		case TodolistsActionType.CHANGE_TODOLIST_FILTER:
			return state.map(el => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el))
		case TodolistsActionType.ADD_TODOLIST: {
			const newTodolist: ITodolist = { id: action.payload.id, title: action.payload.title, filter: 'All' }

			return [...state, newTodolist]
		}
		case TodolistsActionType.REMOVE_TODOLIST:
			return state.filter(el => el.id !== action.payload)
		default:
			return state
	}
}
