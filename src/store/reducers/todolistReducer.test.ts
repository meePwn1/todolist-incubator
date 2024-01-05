import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../../App'
import {
	addTodolistAction,
	changeTodolistFilterAction,
	changeTodolistTitleAction,
	removeTodolistAction,
} from '../actions/todolistActions'
import { todolistReducer } from './todolistReducer'

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()
	startState = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]
})

describe('Todolist reducer', () => {
	test('correct todolist should be removed', () => {
		const endState = todolistReducer(
			startState,
			removeTodolistAction(todolistId1)
		)

		expect(endState.length).toBe(1)
		expect(endState[0].id).toBe(todolistId2)
	})

	test('correct todolist should be added', () => {
		const todolistId3 = v1()

		const newTodolistTitle = 'New Todolist'

		const endState = todolistReducer(
			startState,
			addTodolistAction(todolistId3, newTodolistTitle)
		)

		expect(endState.length).toBe(3)
		expect(endState[0].title).toBe(newTodolistTitle)
	})
	test('correct todolist should change its name', () => {
		const newTodolistTitle = 'New Todolist'

		const endState = todolistReducer(
			startState,
			changeTodolistTitleAction(todolistId2, newTodolistTitle)
		)

		expect(endState[0].title).toBe('What to learn')
		expect(endState[1].title).toBe(newTodolistTitle)
	})

	test('correct filter of todolist should be changed', () => {
		const newFilter: FilterValuesType = 'completed'

		const endState = todolistReducer(
			startState,
			changeTodolistFilterAction(todolistId2, newFilter)
		)

		expect(endState[0].filter).toBe('all')
		expect(endState[1].filter).toBe(newFilter)
	})
})
