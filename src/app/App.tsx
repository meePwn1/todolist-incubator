import { Menu } from '@mui/icons-material'
import { Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar/AppBar'
import { selectAppStatus } from 'app/appSlice'
import LinearIndeterminate from 'common/components/LinearIndeterminate/LinearIndeterminate'
import { useActions } from 'common/hooks/useActions'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import AppRouter from 'components/AppRouter/AppRouter'
import ErrorSnackbar from 'components/Snackbar/ErrorSnackbar'
import { authSelectors, authThunks } from 'features/auth/model/authSlice'

export const App = () => {
	const status = useTypedSelector(selectAppStatus)
	const isLoggedIn = useTypedSelector(authSelectors.selectAuthIsLoggedIn)
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
