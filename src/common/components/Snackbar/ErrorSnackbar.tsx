import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { appActions, selectAppError } from 'app/app-slice'
import { useActions } from 'common/hooks/useActions'
import { useSelector } from 'react-redux'

export const ErrorSnackbar = () => {
	const error = useSelector(selectAppError)
	const { setAppError } = useActions(appActions)
	const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		setAppError({ error: null })
	}

	return (
		<div>
			<Snackbar
				open={error !== null}
				autoHideDuration={5000}
				anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity='error' variant='filled'>
					{error}
				</Alert>
			</Snackbar>
		</div>
	)
}
