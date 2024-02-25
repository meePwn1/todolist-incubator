import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app/app-slice'
import { ResultCode } from 'common/enums'
import {
	AddTaskArgType,
	ITask,
	ITaskState,
	ITodo,
	RemoveTaskArgType,
	UpdateTaskArgType,
	UpdateTaskModel,
} from 'common/types'
import { appErrorHandler } from 'common/utils/app-error-handler'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { thunkTryCatch } from 'common/utils/thunk-try-catch'
import { tasksService } from 'features/TodolistsList/api/tasksService'
import { todolistsActions, todolistsThunks } from './todolistsSlice'

const fetchTasks = createAppAsyncThunk<{ todoID: string; tasks: ITask[] }, string>(
	'tasks/fetchTasks',
	async (todoID, thunkAPI) => {
		return thunkTryCatch(thunkAPI, async () => {
			const res = await tasksService.getTasks(todoID)
			const tasks = res.data.items
			return { todoID, tasks }
		})
	}
)

const removeTaskThunk = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>(
	'tasks/removeTask',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		return thunkTryCatch(thunkAPI, async () => {
			const res = await tasksService.removeTask(arg)
			if (res.data.resultCode === ResultCode.Success) {
				return arg
			} else {
				appErrorHandler(res.data, dispatch)
				return rejectWithValue(null)
			}
		})
	}
)

const addTaskThunk = createAppAsyncThunk<{ task: ITask }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	return thunkTryCatch(thunkAPI, async () => {
		const res = await tasksService.createTask(arg)
		if (res.data.resultCode === ResultCode.Success) {
			const task = res.data.data.item
			return { task }
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	})
})

const updateTaskThunk = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
	'tasks/updateTask',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		return thunkTryCatch(thunkAPI, async () => {
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
			if (res.data.resultCode === ResultCode.Success) {
				return arg
			} else {
				appErrorHandler(res.data, dispatch)
				return rejectWithValue(null)
			}
		})
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
export const tasksThunks = {
	fetchTasks,
	addTaskThunk,
	removeTaskThunk,
	updateTaskThunk,
}
export const tasksReducer = slice.reducer
