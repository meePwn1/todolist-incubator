import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAction } from '../../hooks/useAction'
import { useTypedSelector } from '../../hooks/useTypedSelector'

export default function ErrorSnackbar() {
	const { error } = useTypedSelector(state => state.app)
	const { setAppErrorAction } = useAction()
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return
		}
		setAppErrorAction(null)
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
