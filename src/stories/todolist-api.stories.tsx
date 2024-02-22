import { useEffect, useState } from 'react'
import { UpdateTaskModel } from '../common/types/ITask'
import { tasksService } from '../features/TodolistsList/tasksService'
import { todosService } from '../features/TodolistsList/todosService'

export default {
	title: 'API',
}

export const GetTodos = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		todosService.getTodos().then(res => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const CreateTodos = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		todosService.createTodo({ title: 'what to learn' }).then(res => setState(res.data.data.item))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodos = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const id = '051260ab-9125-454e-b3d2-73b9af41f7e9'
		todosService.deleteTodo(id).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodos = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const id = '16137370-6ca8-4b9b-beef-1e4834d6d4af'
		todosService.updateTodo(id).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const getTasks = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const id = '436e20d6-5473-476e-a0ba-3c1872db93fd'
		tasksService.getTasks(id).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const createTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const id = '436e20d6-5473-476e-a0ba-3c1872db93fd'
		const title = { title: 'doSomething' }
		tasksService.createTask(id, title).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const updateTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todoID = '436e20d6-5473-476e-a0ba-3c1872db93fd'
		const taskID = 'e598c437-9037-4ade-aaa6-efc3038b4268'
		const data: UpdateTaskModel = {}
		tasksService.updateTask(todoID, taskID, data).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}

export const removeTask = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todoID = '436e20d6-5473-476e-a0ba-3c1872db93fd'
		const taskID = 'e598c437-9037-4ade-aaa6-efc3038b4268'

		tasksService.removeTask(todoID, taskID).then(res => setState(res.data))
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
