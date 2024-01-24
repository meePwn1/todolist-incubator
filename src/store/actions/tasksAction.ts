import { tasksService } from '../../services/tasksService'
import {
	AddTaskAction,
	ITask,
	RemoveTaskAction,
	SetTasksAction,
	TasksActionTypes,
	UpdateTaskAction,
	UpdateTaskModel,
} from '../../types/ITask'
import { IThunk } from '../../types/IThunk'

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
	dispatch =>
		tasksService
			.getTasks(todoID)
			.then(res => dispatch(setTasksAction(todoID, res.data.items)))

export const removeTaskThunk =
	(todoID: string, taskID: string): IThunk =>
	dispatch =>
		tasksService
			.removeTask(todoID, taskID)
			.then(() => dispatch(removeTaskAction(taskID, todoID)))

export const addTaskThunk =
	(todoID: string, title: string): IThunk =>
	dispatch =>
		tasksService
			.createTask(todoID, { title })
			.then(res => dispatch(addTaskAction(res.data.data.item)))

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
			tasksService
				.updateTask(todoID, taskID, model)
				.then(() => dispatch(updateTaskAction(todoID, taskID, model)))
		}
	}
