import {
	AddTaskAction,
	ChangeTaskStatusAction,
	ChangeTaskTitleAction,
	InitTaskAction,
	RemoveTaskAction,
	TasksActionType,
} from '../../types/Tasks'

export const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusAction => {
	return {
		type: TasksActionType.CHANGE_TASK_STATUS,
		payload: {
			todolistID,
			taskID,
			isDone,
		},
	}
}

export const changeTaskTitle = (todolistID: string, taskID: string, title: string): ChangeTaskTitleAction => {
	return {
		type: TasksActionType.CHANGE_TASK_TITLE,
		paylod: {
			todolistID,
			taskID,
			title,
		},
	}
}

export const addTask = (todolistID: string, task: string): AddTaskAction => {
	return {
		type: TasksActionType.ADD_TASK,
		payload: {
			todolistID,
			task,
		},
	}
}

export const removeTask = (todolistID: string, taskID: string): RemoveTaskAction => {
	return {
		type: TasksActionType.REMOVE_TASK,
		payload: {
			todolistID,
			taskID,
		},
	}
}

export const initTaskAction = (payload: string): InitTaskAction => {
	return {
		type: TasksActionType.INIT_TASK,
		payload,
	}
}
