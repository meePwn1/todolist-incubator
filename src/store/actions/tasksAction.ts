import { tasksService } from '../../services/tasksService'
import { ITask, TaskStatuses, UpdateTaskModel } from '../../types/ITask'
import { IThunk } from '../../types/IThunk'
import {
	AddTodolistAction,
	RemoveTodolistAction,
	SetTodolistAction,
} from './todolistActions'

export enum TasksActionTypes {
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	CHANGE_STATUS = 'CHANGE_STATUS',
	CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
	SET_TASK = 'SET_TASK',
}

interface RemoveTaskAction {
	type: TasksActionTypes.REMOVE_TASK
	id: string
	todoId: string
}
interface AddTaskAction {
	type: TasksActionTypes.ADD_TASK
	task: ITask
}
interface ChangeStatusAction {
	type: TasksActionTypes.CHANGE_STATUS
	id: string
	status: TaskStatuses
	todoId: string
}
interface ChangeTaskTitleAction {
	type: TasksActionTypes.CHANGE_TASK_TITLE
	id: string
	newTitle: string
	todoId: string
}

interface SetTasksAction {
	type: TasksActionTypes.SET_TASK
	todoID: string
	data: ITask[]
}

export type TasksAction =
	| RemoveTaskAction
	| AddTaskAction
	| ChangeStatusAction
	| ChangeTaskTitleAction
	| AddTodolistAction
	| RemoveTodolistAction
	| SetTodolistAction
	| SetTasksAction

export const removeTaskAction = (
	id: string,
	todoId: string
): RemoveTaskAction => {
	return {
		type: TasksActionTypes.REMOVE_TASK,
		id,
		todoId,
	}
}

export const addTaskAction = (task: ITask): AddTaskAction => {
	return {
		type: TasksActionTypes.ADD_TASK,
		task,
	}
}

export const changeStatusAction = (
	id: string,
	status: TaskStatuses,
	todoId: string
): ChangeStatusAction => {
	return {
		type: TasksActionTypes.CHANGE_STATUS,
		id,
		status,
		todoId,
	}
}

export const changeTaskTitleAction = (
	id: string,
	newTitle: string,
	todoId: string
): ChangeTaskTitleAction => {
	return {
		type: TasksActionTypes.CHANGE_TASK_TITLE,
		id,
		newTitle,
		todoId,
	}
}
export const setTasksAction = (
	todoID: string,
	data: ITask[]
): SetTasksAction => {
	return {
		type: TasksActionTypes.SET_TASK,
		todoID,
		data,
	}
}

export const fetchTasks =
	(todoID: string): IThunk =>
	dispatch =>
		tasksService
			.getTasks(todoID)
			.then(res => dispatch(setTasksAction(todoID, res.data.items)))

export const removeTaskThunk =
	(todoID: string, taskID: string): IThunk =>
	dispatch =>
		tasksService
			.removeTask(todoID, taskID)
			.then(res => dispatch(removeTaskAction(taskID, todoID)))

export const addTaskThunk =
	(todoID: string, title: string): IThunk =>
	dispatch =>
		tasksService
			.createTask(todoID, { title })
			.then(res => dispatch(addTaskAction(res.data.data.item)))

export const updateTaskThunk =
	(todoID: string, taskID: string, status: TaskStatuses): IThunk =>
	(dispatch, getState) => {
		const task = getState().tasks[todoID].find(el => el.id === taskID)
		if (task) {
			const model: UpdateTaskModel = {
				title: task.title,
				completed: task.completed,
				deadline: task.deadline,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				status,
			}
			tasksService
				.updateTask(todoID, taskID, model)
				.then(res => dispatch(changeStatusAction(taskID, status, todoID)))
		}
	}
