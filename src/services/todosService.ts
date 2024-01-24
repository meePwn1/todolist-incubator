import { axiosTodos } from '../api/api'
import { ITodo } from '../types/ITodo'

interface IResponse<T = {}> {
	data: T
	fieldsErrors: []
	messages: string[]
	resultCode: number
}

const TODOS = '/todo-lists'

export const todosService = {
	async getTodos() {
		return axiosTodos.get<ITodo[]>(TODOS)
	},
	async createTodo(title: { title: string }) {
		return axiosTodos.post<IResponse<{ item: ITodo }>>(TODOS, title)
	},
	async updateTodo(id: string, title: { title: string }) {
		return axiosTodos.put<IResponse<{ item: ITodo }>>(`${TODOS}/${id}`, title)
	},
	async deleteTodo(id: string) {
		return axiosTodos.delete<IResponse>(`${TODOS}/${id}`)
	},
}
