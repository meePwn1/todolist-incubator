import { TaskPriorities, TaskStatuses } from 'common/enums'

export interface RemoveTaskArgType {
	todoID: string
	taskID: string
}
export interface AddTaskArgType {
	todoID: string
	title: string
}
export interface UpdateTaskArgType {
	todoID: string
	taskID: string
	taskFields: Partial<UpdateTaskModel>
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

export type ITaskState = Record<string, ITask[]>
