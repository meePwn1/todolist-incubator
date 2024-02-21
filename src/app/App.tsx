import { Menu } from '@mui/icons-material'
import { Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import { useActions } from 'hooks/useActions'
import { selectAppStatus } from 'store/slices/appSlice'
import { authThunks, selectAuthIsLoggedIn } from 'store/slices/authSlice'
import AppRouter from '../components/AppRouter/AppRouter'
import LinearIndeterminate from '../components/LinearIndeterminate/LinearIndeterminate'
import ErrorSnackbar from '../components/Snackbar/ErrorSnackbar'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const App = () => {
	const status = useTypedSelector(selectAppStatus)
	const isLoggedIn = useTypedSelector(selectAuthIsLoggedIn)
	const { logout } = useActions(authThunks)
	const logOutHandler = () => {
		if (isLoggedIn) {
			logout()
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
					<Button color='inherit' onClick={logOutHandler}>
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
