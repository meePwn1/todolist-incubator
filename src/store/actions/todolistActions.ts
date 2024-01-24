import { todosService } from '../../services/todosService'
import { IThunk } from '../../types/IThunk'
import {
	AddTodolistAction,
	ChangeTodolistFilterAction,
	ChangeTodolistTitleAction,
	FilterValuesType,
	ITodo,
	RemoveTodolistAction,
	SetTodolistAction,
	TodolistActionTypes,
} from '../../types/ITodo'

export const addTodolistAction = (data: ITodo): AddTodolistAction => {
	return {
		type: TodolistActionTypes.ADD_TODOLIST,
		data,
	}
}

export const removeTodolistAction = (id: string): RemoveTodolistAction => {
	return {
		type: TodolistActionTypes.REMOVE_TODOLIST,
		id,
	}
}

export const changeTodolistTitleAction = (
	id: string,
	title: string
): ChangeTodolistTitleAction => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_TITLE,
		id,
		title,
	}
}

export const changeTodolistFilterAction = (
	id: string,
	filter: FilterValuesType
): ChangeTodolistFilterAction => {
	return {
		type: TodolistActionTypes.CHANGE_TODOLIST_FILTER,
		id,
		filter,
	}
}

export const setTodolistAction = (data: ITodo[]): SetTodolistAction => {
	return {
		type: TodolistActionTypes.SET_TODOLIST,
		data,
	}
}

export const fetchTodolist = (): IThunk => async dispatch => {
	const { data } = await todosService.getTodos()
	dispatch(setTodolistAction(data))
}

export const addTodoThunk =
	(title: string): IThunk =>
	dispatch =>
		todosService
			.createTodo({ title })
			.then(res => dispatch(addTodolistAction(res.data.data.item)))

export const updateTitleTodoThunk =
	(id: string, title: string): IThunk =>
	dispatch =>
		todosService
			.updateTodo(id, { title })
			.then(() => dispatch(changeTodolistTitleAction(id, title)))

export const removeTodoThunk =
	(id: string): IThunk =>
	dispatch =>
		todosService.deleteTodo(id).then(() => dispatch(removeTodolistAction(id)))
