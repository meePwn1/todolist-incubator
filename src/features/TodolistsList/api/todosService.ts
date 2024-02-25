import { instance } from 'common/api/common.api'
import { BaseResponseType, ITodo } from 'common/types'

const TODOS = '/todo-lists'

export const todosService = {
	async getTodos() {
		return instance.get<ITodo[]>(TODOS)
	},
	async createTodo(title: { title: string }) {
		return instance.post<BaseResponseType<{ item: ITodo }>>(TODOS, title)
	},
	async updateTodo(id: string, title: { title: string }) {
		return instance.put<BaseResponseType<{ item: ITodo }>>(`${TODOS}/${id}`, title)
	},
	async deleteTodo(id: string) {
		return instance.delete<BaseResponseType>(`${TODOS}/${id}`)
	},
}
