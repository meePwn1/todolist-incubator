import { instance } from 'common/api/common.api'
import { AddTaskArgType, ITask, RemoveTaskArgType, UpdateTaskModel } from 'common/types/ITask'

interface IGetResponse {
	error: null | string
	items: ITask[]
	totalCount: number
}

interface IResponse<T = Record<string, never>> {
	data: T
	fieldsErrors: []
	messages: string[]
	resultCode: number
}

const TASKS = 'tasks'
const TODOS = '/todo-lists'

export const tasksService = {
	async getTasks(todoID: string) {
		const response = await instance.get<IGetResponse>(`${TODOS}/${todoID}/${TASKS}`)
		return response
	},
	async createTask(arg: AddTaskArgType) {
		const response = await instance.post<IResponse<{ item: ITask }>>(`${TODOS}/${arg.todoID}/${TASKS}`, {
			title: arg.title,
		})
		return response
	},
	async updateTask(todoID: string, taskID: string, data: UpdateTaskModel) {
		const response = await instance.put<IResponse<{ item: ITask }>>(`${TODOS}/${todoID}/${TASKS}/${taskID}`, data)
		return response
	},
	async removeTask(arg: RemoveTaskArgType) {
		const response = await instance.delete<IResponse>(`${TODOS}/${arg.todoID}/${TASKS}/${arg.taskID}`)
		return response
	},
}
