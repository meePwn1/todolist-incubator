import { useState } from 'react'
import { v1 } from 'uuid'
import './App.scss'
import AddItemForm from './components/AddItemForm'
import Todolist, { TaskType } from './components/Todolist/Todolist'

export type FilterValueType = 'All' | 'Completed' | 'Active'

type todolistsType = { id: string; title: string; filter: FilterValueType }

function App(): JSX.Element {
	const todolistIDs = [v1(), v1()]

	let [todolists, setTodolists] = useState<Array<todolistsType>>([
		{ id: todolistIDs[0], title: 'What to learn', filter: 'All' },
		{ id: todolistIDs[1], title: 'What to buy', filter: 'All' },
	])

	let [tasks, setTasks] = useState({
		[todolistIDs[0]]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
		[todolistIDs[1]]: [
			{ id: v1(), title: 'HTML&CSS2', isDone: true },
			{ id: v1(), title: 'JS2', isDone: true },
			{ id: v1(), title: 'ReactJS2', isDone: false },
			{ id: v1(), title: 'Rest API2', isDone: false },
			{ id: v1(), title: 'GraphQL2', isDone: false },
		],
	})

	const changeTodolistTitle = (todolistID: string, title: string) => {
		setTodolists(todolists.map(tl => (tl.id === todolistID ? { ...tl, title } : tl)))
	}
	const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
		setTasks({
			...tasks,
			[todolistID]: tasks[todolistID].map(task => (task.id === taskID ? { ...task, title } : task)),
		})
	}

	const createTodolist = (title: string) => {
		const newTodolistId = v1()
		setTodolists([{ id: newTodolistId, title, filter: 'All' }, ...todolists])
		setTasks({ ...tasks, [newTodolistId]: [] })
	}
	const removeTodolist = (todoID: string) => {
		setTodolists(todolists.filter(tl => tl.id !== todoID))
		setTasks(prevTasks => {
			const updatedTask = { ...prevTasks }
			delete updatedTask[todoID]
			return updatedTask
		})
	}

	const createTask = (todolistID: string, task: string) => {
		const newTask: TaskType = { id: v1(), title: task, isDone: false }
		setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], newTask] })
	}

	const removeTask = (todolistID: string, taskID: string) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID) })
	}

	const changeTaskStatus = (todolistID: string, id: string, isDone: boolean) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => (el.id === id ? { ...el, isDone } : el)) })
	}

	const changeFilter = (todolistID: string, value: FilterValueType) => {
		setTodolists(todolists.map(tl => (tl.id === todolistID ? { ...tl, filter: value } : tl)))
	}

	return (
		<div className='App'>
			<AddItemForm addItem={createTodolist} placeholder='New todolist' />
			<div className='todolists'>
				<div className='todolists__wrapper'>
					{todolists.map(tl => {
						return (
							<Todolist
								key={tl.id}
								todolistID={tl.id}
								title={tl.title}
								tasks={tasks[tl.id]}
								removeTask={removeTask}
								filterTask={changeFilter}
								createTask={createTask}
								changeTaskStatus={changeTaskStatus}
								removeTodolist={removeTodolist}
								changeTodolistTitle={changeTodolistTitle}
								changeTaskTitle={changeTaskTitle}
								filter={tl.filter}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default App
