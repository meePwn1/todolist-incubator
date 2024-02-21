import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { tasksService } from 'services/tasksService'
import { IThunk } from 'store/store'
import { ITask, ITaskState, UpdateTaskModel } from 'types/ITask'
import { ITodo } from 'types/ITodo'
import { appErrorHandler } from 'utils/app-error-handler'
import { serverErrorHandler } from 'utils/server-error-handler'
import { appActions } from './appSlice'
import { todolistsActions } from './todolistsSlice'

const fetchTasks =
	(todoID: string): IThunk =>
	dispatch => {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		tasksService
			.getTasks(todoID)
			.then(res => {
				if (!res.data.error) {
					dispatch(tasksActions.setTasks({ todoID, tasks: res.data.items }))
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
				} else {
					dispatch(appActions.setAppStatus({ status: 'failed' }))
					dispatch(appActions.setAppError({ error: res.data.error }))
				}
			})
			.catch(err => {
				serverErrorHandler(err, dispatch)
			})
	}

const removeTaskThunk =
	(todoID: string, taskID: string): IThunk =>
	dispatch => {
		tasksService
			.removeTask(todoID, taskID)
			.then(() => {
				dispatch(tasksActions.removeTask({ todoID, taskID }))
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}

const addTaskThunk =
	(todoID: string, title: string): IThunk =>
	dispatch => {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		tasksService
			.createTask(todoID, { title })
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(tasksActions.addTask({ todoID, task: res.data.data.item }))
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => {
				serverErrorHandler(err, dispatch)
			})
	}

const updateTaskThunk =
	(todoID: string, taskID: string, updateFields: Partial<UpdateTaskModel>): IThunk =>
	(dispatch, getState) => {
		const task = getState().tasks[todoID].find((el: ITask) => el.id === taskID)
		if (task) {
			const model: UpdateTaskModel = {
				title: task.title,
				deadline: task.deadline,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				status: task.status,
				...updateFields,
			}
			dispatch(appActions.setAppStatus({ status: 'loading' }))
			tasksService
				.updateTask(todoID, taskID, model)
				.then(res => {
					if (!res.data.resultCode) {
						dispatch(tasksActions.updateTask({ todoID, taskID, model }))
						dispatch(appActions.setAppStatus({ status: 'succeeded' }))
					} else {
						appErrorHandler(res.data, dispatch)
					}
				})
				.catch(err => {
					serverErrorHandler(err, dispatch)
				})
		}
	}

const initialState: ITaskState = {}
const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks(state, action: PayloadAction<{ todoID: string; tasks: ITask[] }>) {
			state[action.payload.todoID] = action.payload.tasks
		},
		addTask(state, action: PayloadAction<{ todoID: string; task: ITask }>) {
			const tasks = state[action.payload.todoID]
			tasks.unshift(action.payload.task)
		},
		removeTask(state, action: PayloadAction<{ todoID: string; taskID: string }>) {
			const tasks = state[action.payload.todoID]
			const index = tasks.findIndex(el => el.id === action.payload.taskID)
			if (index !== -1) tasks.splice(index, 1)
		},
		updateTask(state, action: PayloadAction<{ todoID: string; taskID: string; model: UpdateTaskModel }>) {
			const tasks = state[action.payload.todoID]
			const index = tasks.findIndex(el => el.id === action.payload.taskID)
			if (index !== -1) {
				tasks[index] = { ...tasks[index], ...action.payload.model }
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(todolistsActions.addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsActions.removeTodolist, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(todolistsActions.setTodolist, (state, action) => {
				action.payload.todolists.forEach((el: ITodo) => (state[el.id] = []))
			})
	},
})

export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTaskThunk, removeTaskThunk, updateTaskThunk }
export const tasksReducer = slice.reducer
