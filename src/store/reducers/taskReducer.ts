import { IEntityTask } from '../../types/ITask'
import { TasksAction, TasksActionTypes } from '../actions/tasksAction'
import { TodolistActionTypes } from '../actions/todolistActions'

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
		case TasksActionTypes.CHANGE_STATUS:
			return {
				...state,
				[action.todoId]: state[action.todoId].map(el =>
					el.id === action.id ? { ...el, status: action.status } : el
				),
			}
		case TodolistActionTypes.REMOVE_TODOLIST:
			return state
		case TodolistActionTypes.SET_TODOLIST: {
			const newState = { ...state }
			action.data.forEach(el => (newState[el.id] = []))
			return newState
		}
		case TasksActionTypes.SET_TASK: {
			const newState = { ...state }
			newState[action.todoID] = action.data
			return newState
		}
		default:
			return state
	}
}
