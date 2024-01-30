import { Menu } from '@mui/icons-material'
import {
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import TodolistPage from '../Pages/TodolistPage'
import LinearIndeterminate from '../components/LinearIndeterminate/LinearIndeterminate'
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
				<TodolistPage />
			</Container>
		</>
	)
}
