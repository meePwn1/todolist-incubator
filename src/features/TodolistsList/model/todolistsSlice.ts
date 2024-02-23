import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app/app-slice'
import { ResultCode } from 'common/enums'
import { RequestStatusType } from 'common/types/IApp'
import { FilterValuesType, IEntityTodo, ITodo, UpdateTitleArgType } from 'common/types/ITodo'
import { appErrorHandler } from 'common/utils/app-error-handler'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { serverErrorHandler } from 'common/utils/server-error-handler'
import { todosService } from 'features/TodolistsList/api/todosService'

const fetchTodolist = createAppAsyncThunk<{ todolists: ITodo[] }>('todo/fetchTodo', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await todosService.getTodos()
		dispatch(appActions.setAppStatus({ status: 'succeeded' }))
		return { todolists: res.data }
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	}
})
const addTodoThunk = createAppAsyncThunk<{ todolist: ITodo }, string>('todo/addTodo', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await todosService.createTodo({ title: arg })
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return { todolist: res.data.data.item }
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	}
})
const updateTitleTodoThunk = createAppAsyncThunk<UpdateTitleArgType, UpdateTitleArgType>(
	'todo/updateTitle',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: 'loading' }))
			const res = await todosService.updateTodo(arg.id, { title: arg.title })
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: 'succeeded' }))
				return { id: arg.id, title: arg.title }
			} else {
				appErrorHandler(res.data, dispatch)
				return rejectWithValue(null)
			}
		} catch (error) {
			serverErrorHandler(error, dispatch)
			return rejectWithValue(null)
		} finally {
			dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: 'idle' }))
		}
	}
)
const removeTodoThunk = createAppAsyncThunk<{ id: string }, string>('todo/removeTodo', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg, entityStatus: 'loading' }))
		const res = await todosService.deleteTodo(arg)
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg, entityStatus: 'succeeded' }))
			return { id: arg }
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg, entityStatus: 'idle' }))
	}
})

const initialState = [] as IEntityTodo[]
const slice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
			const todolist = state.find(el => el.id === action.payload.id)
			if (todolist) {
				todolist.entityStatus = action.payload.entityStatus
			}
		},
		changeTodolistFilter(state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) {
			const todolist = state.find(el => el.id === action.payload.id)
			if (todolist) {
				todolist.filter = action.payload.filter
			}
		},
		clearState() {
			return []
		},
	},
	selectors: {
		selectTodos: state => state,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTodolist.fulfilled, (_, action) => {
				return action.payload.todolists.map(el => ({ ...el, filter: 'all', entityStatus: 'idle' }))
			})
			.addCase(addTodoThunk.fulfilled, (state, action) => {
				const newTodo: IEntityTodo = { ...action.payload.todolist, filter: 'all', entityStatus: 'idle' }
				state.unshift(newTodo)
			})
			.addCase(updateTitleTodoThunk.fulfilled, (state, action) => {
				const todolist = state.find(el => el.id === action.payload.id)
				if (todolist) {
					todolist.title = action.payload.title
				}
			})
			.addCase(removeTodoThunk.fulfilled, (state, action) => {
				const index = state.findIndex(todo => todo.id === action.payload.id)
				if (index !== -1) state.splice(index, 1)
			})
	},
})

export const todolistsActions = slice.actions
export const todolistsSelectors = slice.selectors
export const todolistsThunks = { addTodoThunk, fetchTodolist, removeTodoThunk, updateTitleTodoThunk }
export const todolistsReducer = slice.reducer
