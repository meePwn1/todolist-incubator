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
	title: string
	description: string
	completed: boolean
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
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
