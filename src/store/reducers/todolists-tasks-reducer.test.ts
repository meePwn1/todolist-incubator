import { v1 } from 'uuid'
import { TasksStateType, TodolistType } from '../../App'
import { addTodolist, removeTodolist } from '../actions/todolistActions'
import { tasksReducer } from './taskReducer'
import { todolistReducer } from './todolistReducer'

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistsState: Array<TodolistType> = []
	const newTodoId = v1()

	const action = addTodolist(newTodoId, 'new todolist')

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistsState[0].id

	expect(idFromTasks).toBe(action.payload.id)
	expect(idFromTodolists).toBe(action.payload.id)
})

test('property with todolistId should be deleted', () => {
	const startState: TasksStateType = {
		todolistId1: [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		todolistId2: [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = removeTodolist('todolistId2')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
})
