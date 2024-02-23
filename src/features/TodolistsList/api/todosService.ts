import { instance } from 'common/api/common.api'
import { ITodo } from '../../../common/types/ITodo'

interface IResponse<T = Record<string, never>> {
	data: T
	fieldsErrors: []
	messages: string[]
	resultCode: number
}

const TODOS = '/todo-lists'

export const todosService = {
	async getTodos() {
		return instance.get<ITodo[]>(TODOS)
	},
	async createTodo(title: { title: string }) {
		return instance.post<IResponse<{ item: ITodo }>>(TODOS, title)
	},
	async updateTodo(id: string, title: { title: string }) {
		return instance.put<IResponse<{ item: ITodo }>>(`${TODOS}/${id}`, title)
	},
	async deleteTodo(id: string) {
		return instance.delete<IResponse>(`${TODOS}/${id}`)
	},
}
