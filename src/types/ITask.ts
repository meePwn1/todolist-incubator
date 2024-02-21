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

export type ITaskState = Record<string, ITask[]>
