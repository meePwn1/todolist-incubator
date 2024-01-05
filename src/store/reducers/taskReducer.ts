import { v1 } from 'uuid'
import { TasksStateType } from '../../App'
import { TasksAction, TasksActionTypes } from '../actions/tasksAction'
import { TodolistActionTypes } from '../actions/todolistActions'

export const tasksReducer = (
	state: TasksStateType,
	action: TasksAction
): TasksStateType => {
	switch (action.type) {
		case TasksActionTypes.REMOVE_TASK:
			return {
				...state,
				[action.payload.todoId]: state[action.payload.todoId].filter(
					el => el.id !== action.payload.id
				),
			}
		case TasksActionTypes.ADD_TASK:
			return {
				...state,
				[action.payload.todoId]: [
					...state[action.payload.todoId],
					{ id: v1(), isDone: false, title: action.payload.title },
				],
			}
		case TasksActionTypes.CHANGE_STATUS:
			return {
				...state,
				[action.payload.todoId]: state[action.payload.todoId].map(el =>
					el.id === action.payload.id
						? { ...el, isDone: action.payload.isDone }
						: el
				),
			}
		case TasksActionTypes.CHANGE_TASK_TITLE:
			return {
				...state,
				[action.payload.todoId]: state[action.payload.todoId].map(el =>
					el.id === action.payload.id
						? { ...el, title: action.payload.newTitle }
						: el
				),
			}
		case TodolistActionTypes.ADD_TODOLIST:
			return {
				...state,
				[action.payload.id]: [],
			}
		case TodolistActionTypes.REMOVE_TODOLIST: {
			const newState = { ...state }
			delete newState[action.payload]
			return newState
		}
		default:
			throw new Error('Incorrect type')
	}
}
