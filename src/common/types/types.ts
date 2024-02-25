import { TaskPriorities, TaskStatuses } from 'common/enums'

export interface IApp {
	status: RequestStatusType
	error: string | null
	isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface AuthRequestPayload {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: boolean
}

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

export interface UpdateTitleArgType {
	title: string
	id: string
}
export type FilterValuesType = 'all' | 'active' | 'completed'

export interface ITodo {
	id: string
	title: string
	addedDate: string
	order: number
}

export interface IEntityTodo extends ITodo {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}

interface FieldsError {
	error: string
	field: string
}

export interface BaseResponseType<T = object> {
	data: T
	fieldsErrors: FieldsError[]
	messages: string[]
	resultCode: number
}
