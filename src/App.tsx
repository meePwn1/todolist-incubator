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
import { useEffect } from 'react'
import './App.css'
import { AddItemForm } from './components/AddItemForm'
import { Todolist } from './components/Todolist'
import { useAction } from './hooks/useAction'
import { useTypedSelector } from './hooks/useTypedSelector'

export const App = () => {
	const todos = useTypedSelector(state => state.todos)
	const { fetchTodolist, addTodoThunk } = useAction()

	useEffect(() => {
		fetchTodolist()
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
					<AddItemForm addItem={addTodoThunk} />
				</Grid>
				<Grid container spacing={3}>
					{todos.map(tl => {
						return (
							<Grid key={tl.id} item>
								<Paper style={{ padding: '25px' }} elevation={12}>
									<Todolist key={tl.id} todo={tl} />
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}
