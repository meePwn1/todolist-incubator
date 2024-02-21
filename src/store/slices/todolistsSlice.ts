import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { todosService } from 'services/todosService'
import { IThunk } from 'store/store'
import { RequestStatusType } from 'types/IApp'
import { FilterValuesType, IEntityTodo, ITodo } from 'types/ITodo'
import { appErrorHandler } from 'utils/app-error-handler'
import { serverErrorHandler } from 'utils/server-error-handler'
import { appActions } from './appSlice'
import { tasksThunks } from './tasksSlice'

const fetchTodolist = (): IThunk => dispatch => {
	dispatch(appActions.setAppStatus({ status: 'loading' }))
	todosService
		.getTodos()
		.then(res => {
			dispatch(todolistsActions.setTodolist({ todolists: res.data }))
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return res.data
		})
		.then(data => data.forEach(el => dispatch(tasksThunks.fetchTasks(el.id))))
		.catch(err => serverErrorHandler(err, dispatch))
}

const addTodoThunk =
	(title: string): IThunk =>
	dispatch => {
		appActions.setAppStatus({ status: 'loading' })
		todosService
			.createTodo({ title })
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

const updateTitleTodoThunk =
	(id: string, title: string): IThunk =>
	dispatch => {
		todosService
			.updateTodo(id, { title })
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(todolistsActions.changeTodolistTitle({ id, title }))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

const removeTodoThunk =
	(id: string): IThunk =>
	dispatch => {
		dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: 'loading' }))
		todosService
			.deleteTodo(id)
			.then(() => {
				dispatch(todolistsActions.removeTodolist({ id }))
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

const initialState = [] as IEntityTodo[]
const slice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setTodolist(_, action: PayloadAction<{ todolists: ITodo[] }>) {
			return action.payload.todolists.map(el => ({ ...el, filter: 'all', entityStatus: 'idle' }))
		},
		addTodolist(state, action: PayloadAction<{ todolist: ITodo }>) {
			const newTodo: IEntityTodo = { ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }
			state.unshift(newTodo)
		},
		removeTodolist(state, action: PayloadAction<{ id: string }>) {
			const index = state.findIndex(todo => todo.id === action.payload.id)
			if (index !== -1) state.splice(index, 1)
		},
		changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
			const todolist = state.find(el => el.id === action.payload.id)
			if (todolist) {
				todolist.entityStatus = action.payload.entityStatus
			}
		},
		changeTodolistTitle(state, action: PayloadAction<{ id: string; title: string }>) {
			const todolist = state.find(el => el.id === action.payload.id)
			if (todolist) {
				todolist.title = action.payload.title
			}
		},
		changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
			const todolist = state.find(el => el.id === action.payload.id)
			if (todolist) {
				todolist.filter = action.payload.filter
			}
		},
	},
})

export const todolistsActions = slice.actions
export const todolistsThunks = { addTodoThunk, fetchTodolist, removeTodoThunk, updateTitleTodoThunk }
export const todolistsReducer = slice.reducer
