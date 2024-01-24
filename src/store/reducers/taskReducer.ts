import { IEntityTask, TasksAction, TasksActionTypes } from '../../types/ITask'
import { TodolistActionTypes } from '../../types/ITodo'

const initialState: IEntityTask = {}

export const tasksReducer = (
	state = initialState,
	action: TasksAction
): IEntityTask => {
	switch (action.type) {
		case TasksActionTypes.REMOVE_TASK:
			return {
				...state,
				[action.todoId]: state[action.todoId].filter(el => el.id !== action.id),
			}
		case TasksActionTypes.ADD_TASK:
			return {
				...state,
				[action.task.todoListId]: [
					action.task,
					...state[action.task.todoListId],
				],
			}
		case TasksActionTypes.UPDATE_TASK:
			return {
				...state,
				[action.todoId]: state[action.todoId].map(el =>
					el.id === action.id ? { ...el, ...action.model } : el
				),
			}
		case TodolistActionTypes.SET_TODOLIST: {
			const newState = { ...state }
			action.data.forEach(el => (newState[el.id] = []))
			return newState
		}
		case TasksActionTypes.SET_TASK:
			return { ...state, [action.todoID]: action.data }
		case TodolistActionTypes.ADD_TODOLIST:
			return { ...state, [action.data.id]: [] }
		case TodolistActionTypes.REMOVE_TODOLIST: {
			const newState = { ...state }
			delete newState[action.id]
			return newState
		}
		default:
			return state
	}
}
