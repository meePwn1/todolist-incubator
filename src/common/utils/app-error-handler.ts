import { appActions } from 'app/appSlice'
import { Dispatch } from 'redux'

interface IResponse<T = Record<string, string | number>> {
	data?: T
	fieldsErrors?: []
	messages: string[]
	resultCode?: number
}

export const appErrorHandler = <T>(data: IResponse<T>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(appActions.setAppError({ error: data.messages[0] }))
	} else {
		dispatch(appActions.setAppError({ error: 'Some error occurred' }))
	}
	dispatch(appActions.setAppStatus({ status: 'failed' }))
}
