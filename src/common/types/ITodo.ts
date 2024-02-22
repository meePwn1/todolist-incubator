import { RequestStatusType } from './IApp'
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
