import { Menu } from '@mui/icons-material'
import { Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import AppRouter from 'app/AppRouter'
import { selectAppStatus } from 'app/app-slice'
import { ErrorSnackbar, LinearIndeterminate } from 'common/components'
import { useActions } from 'common/hooks/useActions'
import { authSelectors, authThunks } from 'features/auth/model/authSlice'
import { useSelector } from 'react-redux'

export const App = () => {
	const status = useSelector(selectAppStatus)
	const isLoggedIn = useSelector(authSelectors.selectAuthIsLoggedIn)
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
