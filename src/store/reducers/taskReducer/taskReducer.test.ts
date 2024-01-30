import { IEntityTask, ITask, UpdateTaskModel } from '../../../types/ITask'
import { ITodo } from '../../../types/ITodo'
import {
	addTaskAction,
	removeTaskAction,
	setTasksAction,
	updateTaskAction,
} from '../../actions/tasksAction'
import {
	addTodolistAction,
	setTodolistAction,
} from '../../actions/todolistActions'
import { tasksReducer } from './taskReducer'

let todolistId1: string
let todolistId2: string
let startState: IEntityTask
let todoState: ITodo[]

beforeEach(() => {
	todolistId1 = '164c3a2d-8f50-4f2a-a6d6-6b3694e09bd0'
	todolistId2 = '9a56b5b4-67f5-43fa-a007-81c1b31bea1d'
	todoState = [
		{
			id: todolistId1,
			title: 'asd',
			addedDate: '2024-01-23T03:37:17.22',
			order: -9,
		},
		{
			id: todolistId2,
			title: 'qwe',
			addedDate: '2024-01-23T03:36:17.667',
			order: -8,
		},
	]
	startState = {
		[todolistId1]: [
			{
				id: '1',
				title: 'qwerty',
				description: null,
				todoListId: todolistId1,
				order: -1,
				status: 0,
				priority: 1,
				startDate: null,
				deadline: null,
				addedDate: '2024-01-23T19:40:04.523',
			},
			{
				id: '2',
				title: 'dsaasd',
				description: null,
				todoListId: todolistId1,
				order: 0,
				status: 0,
				priority: 1,
				startDate: null,
				deadline: null,
				addedDate: '2024-01-23T19:40:01.417',
			},
		],
		[todolistId2]: [
			{
				id: '1',
				title: 'asd',
				description: null,
				todoListId: todolistId2,
				order: -1,
				status: 0,
				priority: 1,
				startDate: null,
				deadline: null,
				addedDate: '2024-01-23T19:54:09.433',
			},
			{
				id: '2',
				title: 'asd',
				description: null,
				todoListId: todolistId2,
				order: 0,
				status: 0,
				priority: 1,
				startDate: null,
				deadline: null,
				addedDate: '2024-01-23T19:54:06.403',
			},
		],
	}
})

test('correct task should be deleted from correct array', () => {
	const action = removeTaskAction('2', todolistId2)

	const endState = tasksReducer(startState, action)

	expect(endState[todolistId2].length).toBe(1)
})

test('correct task should be added to correct array', () => {
	const task: ITask = {
		id: '3',
		title: 'zxc',
		description: null,
		todoListId: todolistId1,
		order: 0,
		status: 0,
		priority: 1,
		startDate: null,
		deadline: null,
		addedDate: '2024-01-23T19:40:01.417',
	}
	const action = addTaskAction(task)

	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1].length).toBe(3)
	expect(endState[todolistId2].length).toBe(2)
	expect(endState[todolistId1][0].id).toBe('3')
	expect(endState[todolistId1][0].title).toBe('zxc')
	expect(endState[todolistId1][0].status).toBe(0)
})

test('status of specified task should be changed', () => {
	const model: UpdateTaskModel = {
		title: 'zzzz',
		description: null,
		status: 2,
		priority: 1,
		startDate: null,
		deadline: null,
	}
	const action = updateTaskAction(todolistId1, '1', model)

	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1][0].status).toBe(2)
	expect(endState[todolistId1].length).toBe(2)
	expect(endState[todolistId1][0].title).toBe('zzzz')
	expect(endState[todolistId2].length).toBe(2)
})

test('tasks array setted to todolistID', () => {
	const tasks: ITask[] = [
		{
			id: '2',
			title: 'asd',
			description: null,
			todoListId: todolistId2,
			order: 0,
			status: 0,
			priority: 1,
			startDate: null,
			deadline: null,
			addedDate: '2024-01-23T19:54:06.403',
		},
	]
	const action = setTasksAction(todolistId1, tasks)
	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1].length).toBe(1)
	expect(endState[todolistId1][0].id).toBe('2')
	expect(endState[todolistId1][0].title).toBe('asd')
	expect(endState[todolistId2].length).toBe(2)
})

test('new empty array tasks setted when new todolist is setted', () => {
	const action = setTodolistAction(todoState)
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(2)
	expect(endState[todolistId1].length).toBe(0)
	expect(endState[todolistId2].length).toBe(0)
})

test('new array should be added when new todolist is added', () => {
	const newTodoID = '123123123'
	const todo = {
		id: newTodoID,
		title: 'zzz',
		addedDate: '2024-01-23T03:37:17.22',
		order: -9,
	}
	const action = addTodolistAction(todo)

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(3)
	expect(endState[newTodoID]).toEqual([])
})
