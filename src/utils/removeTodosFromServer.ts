import { todosService } from '../services/todosService'
import { ITodo } from '../types/ITodo'

export const removeTodosFromServer = (data: ITodo[]) => {
	data.forEach(el => {
		todosService.deleteTodo(el.id)
	})
}
