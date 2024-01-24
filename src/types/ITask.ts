import {
	AddTodolistAction,
	RemoveTodolistAction,
	SetTodolistAction,
} from './ITodo'

export enum TasksActionTypes {
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	UPDATE_TASK = 'UPDATE_TASK',
	SET_TASK = 'SET_TASK',
}

export interface RemoveTaskAction {
	type: TasksActionTypes.REMOVE_TASK
	id: string
	todoId: string
}
export interface AddTaskAction {
	type: TasksActionTypes.ADD_TASK
	task: ITask
}
export interface UpdateTaskAction {
	type: TasksActionTypes.UPDATE_TASK
	id: string
	model: UpdateTaskModel
	todoId: string
}

export interface SetTasksAction {
	type: TasksActionTypes.SET_TASK
	todoID: string
	data: ITask[]
}

export type TasksAction =
	| RemoveTaskAction
	| AddTaskAction
	| UpdateTaskAction
	| AddTodolistAction
	| RemoveTodolistAction
	| SetTodolistAction
	| SetTasksAction

export enum TaskStatuses {
	New = 0,
	NewProgress = 1,
	Completed = 2,
	Draft = 3,
}
export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	High = 2,
	Urgently = 3,
	Later = 4,
}

export interface UpdateTaskModel {
	title: string | null
	description: string | null
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string | null
	deadline: string | null
}

export interface ITask extends UpdateTaskModel {
	id: string
	todoListId: string
	addedDate: string
	order: number
}

export interface IEntityTask {
	[key: string]: ITask[]
}
