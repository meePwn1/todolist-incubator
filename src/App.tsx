import { Menu } from '@mui/icons-material'
import {
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import { useReducer } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { AddItemForm } from './components/AddItemForm'
import { TaskType, Todolist } from './components/Todolist'
import {
	addTaskAction,
	changeStatusAction,
	changeTaskTitleAction,
	removeTaskAction,
} from './store/actions/tasksAction'
import {
	addTodolistAction,
	changeTodolistFilterAction,
	changeTodolistTitleAction,
	removeTodolistAction,
} from './store/actions/todolistActions'
import { tasksReducer } from './store/reducers/taskReducer'
import { todolistReducer } from './store/reducers/todolistReducer'

export type FilterValuesType = 'all' | 'active' | 'completed'

export interface TodolistType {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	])

	const [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true },
		],
	})

	function removeTask(id: string, todolistId: string) {
		dispatchTasks(removeTaskAction(id, todolistId))
	}

	function addTask(title: string, todolistId: string) {
		dispatchTasks(addTaskAction(title, todolistId))
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		dispatchTasks(changeStatusAction(id, isDone, todolistId))
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatchTasks(changeTaskTitleAction(id, newTitle, todolistId))
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatchTodolists(changeTodolistFilterAction(todolistId, value))
	}

	function removeTodolist(id: string) {
		dispatchTodolists(removeTodolistAction(id))
		dispatchTasks(removeTodolistAction(id))
	}

	function changeTodolistTitle(id: string, title: string) {
		dispatchTodolists(changeTodolistTitleAction(id, title))
	}

	const addTodolist = (title: string) => {
		const newTodolistId = v1()
		dispatchTodolists(addTodolistAction(newTodolistId, title))
		dispatchTasks(addTodolistAction(newTodolistId, title))
	}

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map(tl => {
						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(
								t => t.isDone === false
							)
						}
						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
						}

						return (
							<Grid key={tl.id} item>
								<Paper style={{ padding: '25px' }} elevation={12}>
									<Todolist
										key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}
export default App
