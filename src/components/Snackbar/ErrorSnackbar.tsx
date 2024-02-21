import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { appActions } from 'store/slices/appSlice'

export default function ErrorSnackbar() {
	const { error } = useTypedSelector(state => state.app)
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
