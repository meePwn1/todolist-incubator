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
import { useDispatch, useSelector } from 'react-redux'
import { v1 } from 'uuid'
import './App.css'
import { AddItemForm } from './components/AddItemForm'
import { TaskType, Todolist } from './components/Todolist'
import { addTaskAction, changeStatusAction, changeTaskTitleAction, removeTaskAction } from './store/actions/tasksAction'
import { addTodolistAction, changeTodolistFilterAction, changeTodolistTitleAction, removeTodolistAction } from './store/actions/todolistActions'
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


	function removeTask(id: string, todolistId: string) {
		dispatch(removeTaskAction(id, todolistId))
	}

	function addTask(title: string, todolistId: string) {
		dispatch(addTaskAction(title, todolistId))
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {

		dispatch(changeStatusAction(id, isDone, todolistId))
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatch(changeTaskTitleAction(id, newTitle, todolistId))
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatch(changeTodolistFilterAction(todolistId, value))
	}

	function removeTodolist(id: string) {
		dispatch(removeTodolistAction(id))
	}

	function changeTodolistTitle(id: string, title: string) {
		dispatch(changeTodolistTitleAction(id, title))
	}

	function addTodolist(title: string) {
		const newTodolistId = v1()

		dispatch(addTodolistAction(newTodolistId, title))
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
					{todolist.map(tl => {
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
export default AppWithRedux
