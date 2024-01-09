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
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { RootState } from './store/reducers'

export type FilterValuesType = 'all' | 'active' | 'completed'

export interface TodolistType {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	const todolist = useSelector<RootState, TodolistType[]>(state => state.todos)
	const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	console.log('App called')

	const removeTask = useCallback((id: string, todolistId: string) => {
		dispatch(removeTaskAction(id, todolistId))
	}, [])
	const addTask = useCallback((title: string, todolistId: string) => {
		dispatch(addTaskAction(title, todolistId))
	}, [])
	const changeStatus = useCallback(
		(id: string, isDone: boolean, todolistId: string) => {
			dispatch(changeStatusAction(id, isDone, todolistId))
		},
		[]
	)
	const changeTaskTitle = useCallback(
		(id: string, newTitle: string, todolistId: string) => {
			dispatch(changeTaskTitleAction(id, newTitle, todolistId))
		},
		[]
	)
	const changeFilter = useCallback(
		(value: FilterValuesType, todolistId: string) => {
			dispatch(changeTodolistFilterAction(todolistId, value))
		},
		[]
	)
	const removeTodolist = useCallback((id: string) => {
		dispatch(removeTodolistAction(id))
	}, [])
	const changeTodolistTitle = useCallback((id: string, title: string) => {
		dispatch(changeTodolistTitleAction(id, title))
	}, [])
	const addTodolist = useCallback((title: string) => {
		const newTodolistId = v1()
		dispatch(addTodolistAction(newTodolistId, title))
	}, [])

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
					{todolist.map(tl => {
						const allTodolistTasks = tasks[tl.id]
						const tasksForTodolist = allTodolistTasks

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
export default AppWithRedux
