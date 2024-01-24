import { v1 } from 'uuid'
import { FilterValuesType, IEntityTodo, ITodo } from '../../types/ITodo'
import {
	addTodolistAction,
	changeTodolistFilterAction,
	changeTodolistTitleAction,
	removeTodolistAction,
	setTodolistAction,
} from '../actions/todolistActions'
import { todolistReducer } from './todolistReducer'

let todolistId1: string
let todolistId2: string
let startState: IEntityTodo[]

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()
	startState = [
		{
			id: todolistId1,
			title: 'qwe556516',
			addedDate: '2024-01-23T03:37:17.22',
			order: -9,
			filter: 'all',
		},
		{
			id: todolistId2,
			title: 'qwe',
			addedDate: '2024-01-23T03:36:17.667',
			order: -8,
			filter: 'all',
		},
	]
})

describe('Todolist reducer', () => {
	test('correct todolist should be added', () => {
		const todolistId3 = v1()
		const newTitle = 'qweqweqw'
		const newTodo: ITodo = {
			id: todolistId3,
			title: newTitle,
			addedDate: '2024-01-23T03:36:17.667',
			order: -8,
		}

		const endState = todolistReducer(startState, addTodolistAction(newTodo))

		expect(endState.length).toBe(3)
		expect(endState[0].title).toBe(newTitle)
		expect(endState[0].id).toBe(todolistId3)
		expect(endState[0].filter).toBeDefined()
	})

	test('correct todolist should be removed', () => {
		const endState = todolistReducer(
			startState,
			removeTodolistAction(todolistId1)
		)
		expect(endState.length).toBe(1)
		expect(endState[0].id).toBe(todolistId2)
	})

	test('correct todolist should change its name', () => {
		const newTodolistTitle = 'New Todolist'

		const endState = todolistReducer(
			startState,
			changeTodolistTitleAction(todolistId2, newTodolistTitle)
		)

		expect(endState[0].title).toBe('qwe556516')
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
	test('setted new todolists array to state', () => {
		const newTodoID1 = v1()
		const newTodoID2 = v1()
		const newTodos: ITodo[] = [
			{
				id: newTodoID1,
				addedDate: '',
				order: 0,
				title: 'qwe',
			},
			{
				id: newTodoID2,
				addedDate: '',
				order: 0,
				title: 'qwe',
			},
		]

		const action = setTodolistAction(newTodos)
		const endState = todolistReducer(startState, action)

		expect(endState[0].id).toBe(newTodoID1)
		expect(endState[0].title).toBe('qwe')
		expect(endState[1].id).toBe(newTodoID2)
		expect(endState[1].filter).toBeDefined()
	})
})
