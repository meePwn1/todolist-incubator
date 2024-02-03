import { Menu } from '@mui/icons-material'
import {
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import { MouseEvent } from 'react'
import AppRouter from '../components/AppRouter/AppRouter'
import LinearIndeterminate from '../components/LinearIndeterminate/LinearIndeterminate'
import ErrorSnackbar from '../components/Snackbar/ErrorSnackbar'
import { useAction } from '../hooks/useAction'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const App = () => {
	const status = useTypedSelector(state => state.app.status)
	const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
	const { logOutThunk } = useAction()
	const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		if (isLoggedIn) {
			logOutThunk()
		}
	}
	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						<Menu />
					</IconButton>
					<Typography variant='h6'>News</Typography>
					<Button color='inherit' onClick={clickHandler}>
						{isLoggedIn ? 'LogOut' : 'Login'}
					</Button>
				</Toolbar>
			</AppBar>
			{status === 'loading' && <LinearIndeterminate />}
			<Container fixed>
				<AppRouter />
			</Container>
			<ErrorSnackbar />
		</>
	)
}
