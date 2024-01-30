import { Dispatch } from 'redux'
import {
	setAppErrorAction,
	setAppStatusAction,
} from '../store/actions/appActions'
import { AppAction } from '../types/IApp'
interface IResponse<T = {}> {
	data: T
	fieldsErrors: []
	messages: string[]
	resultCode: number
}

export const appErrorHandler = <T>(
	data: IResponse<T>,
	dispatch: Dispatch<AppAction>
) => {
	if (data.messages.length) {
		dispatch(setAppErrorAction(data.messages[0]))
	} else {
		dispatch(setAppErrorAction('Some error occured'))
	}
	dispatch(setAppStatusAction('failed'))
}

export const serverErrorHandler = (
	err: { message: string },
	dispatch: Dispatch<AppAction>
) => {
	dispatch(setAppErrorAction(err.message))
	dispatch(setAppStatusAction('failed'))
}
