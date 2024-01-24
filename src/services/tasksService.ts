import { axiosTasks } from '../api/api'
import { ITask, UpdateTaskModel } from '../types/ITask'

interface IGetResponse {
	error: null | string
	items: ITask[]
	totalCount: number
}

interface IResponse<T = {}> {
	data: T
	fieldsErrors: []
	messages: string[]
	resultCode: number
}

const TASKS = 'tasks'

export const tasksService = {
	async getTasks(todoID: string) {
		const response = await axiosTasks.get<IGetResponse>(`${todoID}/${TASKS}`)
		return response
	},
	async createTask(todoID: string, title: { title: string }) {
		const response = await axiosTasks.post<IResponse<{ item: ITask }>>(
			`${todoID}/${TASKS}`,
			title
		)
		return response
	},
	async updateTask(todoID: string, taskID: string, data: UpdateTaskModel) {
		const response = await axiosTasks.put<IResponse<{ item: ITask }>>(
			`${todoID}/${TASKS}/${taskID}`,
			data
		)
		return response
	},
	async removeTask(todoID: string, taskID: string) {
		const response = await axiosTasks.delete<IResponse>(
			`${todoID}/${TASKS}/${taskID}`
		)
		return response
	},
}
