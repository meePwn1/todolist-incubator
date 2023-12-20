import { v1 } from 'uuid'
import { ITasks, TasksAction, TasksActionType } from '../../types/Tasks'
import { todolistIDs } from './todolistsReducer'

const initialState: ITasks = {
	[todolistIDs[0]]: [
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
		{ id: v1(), title: 'Rest API', isDone: false },
		{ id: v1(), title: 'GraphQL', isDone: false },
	],
	[todolistIDs[1]]: [
		{ id: v1(), title: 'HTML&CSS2', isDone: true },
		{ id: v1(), title: 'JS2', isDone: true },
		{ id: v1(), title: 'ReactJS2', isDone: false },
		{ id: v1(), title: 'Rest API2', isDone: false },
		{ id: v1(), title: 'GraphQL2', isDone: false },
	],
}

export const tasksReducer = (state = initialState, action: TasksAction): ITasks => {
	switch (action.type) {
		case TasksActionType.CHANGE_TASK_STATUS:
			return {
				...state,
				[action.payload.todolistID]: state[action.payload.todolistID].map(el =>
					el.id === action.payload.taskID ? { ...el, isDone: action.payload.isDone } : el
				),
			}
		case TasksActionType.CHANGE_TASK_TITLE:
			return {
				...state,
				[action.paylod.todolistID]: state[action.paylod.todolistID].map(el =>
					el.id === action.paylod.taskID ? { ...el, title: action.paylod.title } : el
				),
			}
		case TasksActionType.ADD_TASK:
			return {
				...state,
				[action.payload.todolistID]: [
					...state[action.payload.todolistID],
					{ id: v1(), title: action.payload.task, isDone: false },
				],
			}
		case TasksActionType.REMOVE_TASK:
			return {
				...state,
				[action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID),
			}
		case TasksActionType.INIT_TASK:
			return { ...state, [action.payload]: [] }
		default:
			return state
	}
}
