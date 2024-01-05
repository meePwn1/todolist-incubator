import { v1 } from 'uuid'
import { TasksStateType } from '../../App'
import {
	addTaskAction,
	changeStatusAction,
	changeTaskTitleAction,
	removeTaskAction,
} from '../actions/tasksAction'
import { addTodolistAction } from '../actions/todolistActions'
import { tasksReducer } from './taskReducer'

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()
	startState = {
		[todolistId1]: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		[todolistId2]: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}
})

test('correct task should be deleted from correct array', () => {
	const action = removeTaskAction('2', todolistId2)

	const endState = tasksReducer(startState, action)

	expect(endState).toEqual({
		[todolistId1]: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		[todolistId2]: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '3', title: 'tea', isDone: false },
		],
	})
})

test('correct task should be added to correct array', () => {
	const action = addTaskAction('juce', todolistId2)

	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1].length).toBe(3)
	expect(endState[todolistId2].length).toBe(4)
	expect(endState[todolistId2][0].id).toBeDefined()
	expect(endState[todolistId2][0].title).toBe('bread')
	expect(endState[todolistId2][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
	const action = changeStatusAction('2', false, todolistId2)

	const endState = tasksReducer(startState, action)

	expect(endState[todolistId2][1].isDone).toBe(false)
	expect(endState[todolistId2].length).toBe(3)
})

test('title of specified task should be changed', () => {
	const action = changeTaskTitleAction('2', 'qwe', todolistId1)

	const endState = tasksReducer(startState, action)

	expect(endState[todolistId1][1].title).toBe('qwe')
	expect(endState[todolistId1].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {
	const newTodolistId = v1()

	const action = addTodolistAction(newTodolistId, 'new todolist')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})
