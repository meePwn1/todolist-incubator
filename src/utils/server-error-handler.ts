import { isAxiosError } from 'axios'
import { Dispatch } from 'redux'
import { appActions } from 'store/slices/appSlice.ts'

export const serverErrorHandler = (err: unknown, dispatch: Dispatch): void => {
	let errorMessage = 'Some error occurred'
	if (isAxiosError<IServerError>(err)) {
		errorMessage = err.response ? err.response.data.errorMessages[0].message : err.message || errorMessage
	} else {
		errorMessage = `Native error: ${(err as Error).message}`
	}
	dispatch(appActions.setAppError({ error: errorMessage }))
	dispatch(appActions.setAppStatus({ status: 'failed' }))
}

interface IServerError {
	errorMessages: Array<{ fields: string; message: string }>
}
