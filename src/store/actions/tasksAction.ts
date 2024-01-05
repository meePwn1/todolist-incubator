import { AddTodolistAction, RemoveTodolistAction } from './todolistActions'

export enum TasksActionTypes {
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	CHANGE_STATUS = 'CHANGE_STATUS',
	CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
}

interface RemoveTaskAction {
	type: TasksActionTypes.REMOVE_TASK
	payload: {
		id: string
		todoId: string
	}
}
interface AddTaskAction {
	type: TasksActionTypes.ADD_TASK
	payload: {
		title: string
		todoId: string
	}
}
interface ChangeStatusAction {
	type: TasksActionTypes.CHANGE_STATUS
	payload: {
		id: string
		isDone: boolean
		todoId: string
	}
}
interface ChangeTaskTitleAction {
	type: TasksActionTypes.CHANGE_TASK_TITLE
	payload: {
		id: string
		newTitle: string
		todoId: string
	}
}

export type TasksAction =
	| RemoveTaskAction
	| AddTaskAction
	| ChangeStatusAction
	| ChangeTaskTitleAction
	| AddTodolistAction
	| RemoveTodolistAction

export const removeTaskAction = (
	id: string,
	todoId: string
): RemoveTaskAction => {
	return {
		type: TasksActionTypes.REMOVE_TASK,
		payload: {
			id,
			todoId,
		},
	}
}

export const addTaskAction = (title: string, todoId: string): AddTaskAction => {
	return {
		type: TasksActionTypes.ADD_TASK,
		payload: {
			title,
			todoId,
		},
	}
}

export const changeStatusAction = (
	id: string,
	isDone: boolean,
	todoId: string
): ChangeStatusAction => {
	return {
		type: TasksActionTypes.CHANGE_STATUS,
		payload: {
			id,
			isDone,
			todoId,
		},
	}
}

export const changeTaskTitleAction = (
	id: string,
	newTitle: string,
	todoId: string
): ChangeTaskTitleAction => {
	return {
		type: TasksActionTypes.CHANGE_TASK_TITLE,
		payload: {
			id,
			newTitle,
			todoId,
		},
	}
}
