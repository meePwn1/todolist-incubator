interface TaskType {
	id: string
	title: string
	isDone: boolean
}

export interface ITasks {
	[key: string]: TaskType[]
}

export enum TasksActionType {
	CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS',
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
	INIT_TASK = 'INIT_TASK',
}

export interface ChangeTaskStatusAction {
	type: TasksActionType.CHANGE_TASK_STATUS
	payload: {
		todolistID: string
		taskID: string
		isDone: boolean
	}
}

export interface RemoveTaskAction {
	type: TasksActionType.REMOVE_TASK
	payload: {
		todolistID: string
		taskID: string
	}
}

export interface AddTaskAction {
	type: TasksActionType.ADD_TASK
	payload: {
		todolistID: string
		task: string
	}
}

export interface ChangeTaskTitleAction {
	type: TasksActionType.CHANGE_TASK_TITLE
	paylod: {
		todolistID: string
		taskID: string
		title: string
	}
}
export interface InitTaskAction {
	type: TasksActionType.INIT_TASK
	payload: string
}

export type TasksAction =
	| ChangeTaskTitleAction
	| AddTaskAction
	| RemoveTaskAction
	| ChangeTaskStatusAction
	| InitTaskAction
