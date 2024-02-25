import { appActions } from 'app/app-slice'
import { AppDispatch } from 'app/store'
import { BaseResponseType } from 'common/types'

/**
 * Application error handler.
 * @template T
 * @param {BaseResponseType<T>} data - Response data from the server.
 * @param {AppDispatch} dispatch - Redux dispatch function.
 * @param {boolean} [isShowError=true] - Flag indicating whether to show the error. Defaults to true.
 * @returns {void}
 */

export const appErrorHandler = <T>(data: BaseResponseType<T>, dispatch: AppDispatch, isShowError = true): void => {
	if (isShowError) {
		if (data.messages.length) {
			dispatch(appActions.setAppError({ error: data.messages[0] }))
		} else {
			dispatch(appActions.setAppError({ error: 'Some error occurred' }))
		}
	}
	dispatch(appActions.setAppStatus({ status: 'failed' }))
}
