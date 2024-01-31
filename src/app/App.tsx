import { Menu } from '@mui/icons-material'
import {
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../Pages/Login'
import TodolistPage from '../Pages/TodolistPage'
import LinearIndeterminate from '../components/LinearIndeterminate/LinearIndeterminate'
import ErrorSnackbar from '../components/Snackbar/ErrorSnackbar'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const App = () => {
	const status = useTypedSelector(state => state.app.status)
	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			{status === 'loading' && <LinearIndeterminate />}
			<Container fixed>
				<Routes>
					<Route path='todolist-incubator/' element={<TodolistPage />} />
					<Route path='todolist-incubator/login' element={<Login />} />
					<Route
						path='todolist-incubator/404'
						element={<h1>404: Page not found</h1>}
					/>
					<Route
						path='*'
						element={<Navigate to={'todolist-incubator/404'} />}
					/>
				</Routes>
			</Container>
			<ErrorSnackbar />
		</>
	)
}
