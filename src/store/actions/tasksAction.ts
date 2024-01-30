import { tasksService } from '../../services/tasksService'
import { RequestStatusType } from '../../types/IApp'
import {
	AddTaskAction,
	ITask,
	RemoveTaskAction,
	SetTaskStatusAction,
	SetTasksAction,
	TasksActionTypes,
	UpdateTaskAction,
	UpdateTaskModel,
} from '../../types/ITask'
import { IThunk } from '../../types/IThunk'
import { appErrorHandler, serverErrorHandler } from '../../utils/errorHandler'
import { setAppErrorAction, setAppStatusAction } from './appActions'

export const setTaskStatusAction = (
	todoID: string,
	taskID: string,
	status: RequestStatusType
): SetTaskStatusAction => {
	return {
		type: TasksActionTypes.SET_STATUS,
		todoID,
		taskID,
		status,
	}
}

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

export const updateTaskAction = (
	todoId: string,
	id: string,
	model: UpdateTaskModel
): UpdateTaskAction => {
	return {
		type: TasksActionTypes.UPDATE_TASK,
		id,
		model,
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
	dispatch => {
		dispatch(setAppStatusAction('loading'))
		tasksService
			.getTasks(todoID)
			.then(res => {
				if (!res.data.error) {
					dispatch(setTasksAction(todoID, res.data.items))
					dispatch(setAppStatusAction('succeeded'))
				} else {
					dispatch(setAppStatusAction('failed'))
					dispatch(setAppErrorAction(res.data.error))
				}
			})
			.catch(err => {
				serverErrorHandler(err, dispatch)
			})
	}

export const removeTaskThunk =
	(todoID: string, taskID: string): IThunk =>
	dispatch => {
		dispatch(setTaskStatusAction(todoID, taskID, 'loading'))
		tasksService
			.removeTask(todoID, taskID)
			.then(() => {
				dispatch(removeTaskAction(taskID, todoID))
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

export const addTaskThunk =
	(todoID: string, title: string): IThunk =>
	dispatch => {
		dispatch(setAppStatusAction('loading'))
		tasksService
			.createTask(todoID, { title })
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(addTaskAction(res.data.data.item))
					dispatch(setAppStatusAction('succeeded'))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => {
				serverErrorHandler(err, dispatch)
			})
	}

export const updateTaskThunk =
	(
		todoID: string,
		taskID: string,
		updateFields: Partial<UpdateTaskModel>
	): IThunk =>
	(dispatch, getState) => {
		const task = getState().tasks[todoID].find(el => el.id === taskID)
		if (task) {
			const model: UpdateTaskModel = {
				title: task.title,
				deadline: task.deadline,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				status: task.status,
				...updateFields,
			}
			dispatch(setAppStatusAction('loading'))
			dispatch(setTaskStatusAction(todoID, taskID, 'loading'))
			tasksService
				.updateTask(todoID, taskID, model)
				.then(res => {
					if (!res.data.resultCode) {
						dispatch(updateTaskAction(todoID, taskID, model))
						dispatch(setAppStatusAction('succeeded'))
						dispatch(setTaskStatusAction(todoID, taskID, 'succeeded'))
					} else {
						appErrorHandler(res.data, dispatch)
					}
				})
				.catch(err => {
					serverErrorHandler(err, dispatch)
				})
		}
	}
