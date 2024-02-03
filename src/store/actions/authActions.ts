import { authService } from '../../services/authService'
import { AuthActionTypes, AuthRequestPayload } from '../../types/IAuth'
import { IThunk } from '../../types/IThunk'
import { appErrorHandler, serverErrorHandler } from '../../utils/errorHandler'
import { setAppStatusAction } from './appActions'

export const setLoginStatus = (value: boolean) => {
	return {
		type: AuthActionTypes.SET_LOGGED_IN,
		value,
	} as const
}
export const setInitializeStatus = (value: boolean) => {
	return {
		type: AuthActionTypes.SET_IS_INITIALIZED,
		value,
	} as const
}

export const loginThunk = (data: AuthRequestPayload): IThunk => {
	return dispatch => {
		dispatch(setAppStatusAction('loading'))
		authService
			.login(data)
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(setLoginStatus(true))
					dispatch(setAppStatusAction('succeeded'))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}
}

export const authMeThunk = (): IThunk => async dispatch => {
	try {
		const res = await authService.me()
		if (!res.data.resultCode) {
			dispatch(setLoginStatus(true))
		}
	} catch (error) {
		alert(error)
	} finally {
		dispatch(setInitializeStatus(true))
	}
}

export const logOutThunk = (): IThunk => async dispatch =>
	authService
		.logOut()
		.then(res => {
			if (!res.data.resultCode) {
				dispatch(setLoginStatus(false))
			} else {
				appErrorHandler(res.data, dispatch)
			}
		})
		.catch(err => serverErrorHandler(err.message, dispatch))
