import { createSlice } from '@reduxjs/toolkit'
import {
	AddTaskArgType,
	ITask,
	ITaskState,
	RemoveTaskArgType,
	UpdateTaskArgType,
	UpdateTaskModel,
} from 'common/types/ITask'
import { ITodo } from 'common/types/ITodo'
import { appErrorHandler } from 'common/utils/app-error-handler'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { serverErrorHandler } from 'common/utils/server-error-handler'
import { tasksService } from 'features/TodolistsList/api/tasksService'
import { appActions } from '../../../app/app-slice'
import { todolistsActions, todolistsThunks } from './todolistsSlice'

const fetchTasks = createAppAsyncThunk<{ tasks: ITask[]; todoID: string }, string>(
	'tasks/fetchTasks',
	async (todoID, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(appActions.setAppStatus({ status: 'loading' }))
			const res = await tasksService.getTasks(todoID)
			const tasks = res.data.items
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return { todoID, tasks }
		} catch (error) {
			serverErrorHandler(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const removeTaskThunk = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
	'tasks/removeTask',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			const res = await tasksService.removeTask(arg)
			if (!res.data.resultCode) {
				return arg
			} else {
				appErrorHandler(res.data, dispatch)
				return rejectWithValue(null)
			}
		} catch (error) {
			serverErrorHandler(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const addTaskThunk = createAppAsyncThunk<{ task: ITask }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		const res = await tasksService.createTask(arg)
		if (!res.data.resultCode) {
			const task = res.data.data.item
			return { task }
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	}
})

const updateTaskThunk = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
	'tasks/updateTask',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const task = getState().tasks[arg.todoID].find(el => el.id === arg.taskID)
			if (!task) {
				dispatch(appActions.setAppError({ error: 'Task not found in the state' }))
				return rejectWithValue(null)
			}
			const apiModel: UpdateTaskModel = {
				deadline: task.deadline,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				title: task.title,
				status: task.status,
				...arg.taskFields,
			}
			const res = await tasksService.updateTask(arg.todoID, arg.taskID, apiModel)
			if (!res.data.resultCode) {
				return arg
			} else {
				appErrorHandler(res.data, dispatch)
				return rejectWithValue(null)
			}
		} catch (error) {
			serverErrorHandler(error, dispatch)
			return rejectWithValue(null)
		}
	}
)

const initialState: ITaskState = {}
const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todoID] = action.payload.tasks
			})
			.addCase(addTaskThunk.fulfilled, (state, action) => {
				state[action.payload.task.todoListId].unshift(action.payload.task)
			})
			.addCase(removeTaskThunk.fulfilled, (state, action) => {
				const tasks = state[action.payload.todoID]
				const index = tasks.findIndex(el => el.id === action.payload.taskID)
				if (index !== -1) tasks.splice(index, 1)
			})
			.addCase(updateTaskThunk.fulfilled, (state, action) => {
				const tasks = state[action.payload.todoID]
				const index = tasks.findIndex(el => el.id === action.payload.taskID)
				if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.taskFields }
			})
			.addCase(todolistsThunks.addTodoThunk.fulfilled, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsThunks.removeTodoThunk.fulfilled, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(todolistsThunks.fetchTodolist.fulfilled, (state, action) => {
				action.payload.todolists.forEach((el: ITodo) => (state[el.id] = []))
			})
			.addCase(todolistsActions.clearState, () => {
				return {}
			})
	},
})

export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTaskThunk, removeTaskThunk, updateTaskThunk }
export const tasksReducer = slice.reducer
