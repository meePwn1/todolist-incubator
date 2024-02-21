import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authService } from 'services/authService'
import { IThunk } from 'store/store'
import { AuthRequestPayload } from 'types/IAuth'
import { appErrorHandler } from 'utils/app-error-handler'
import { serverErrorHandler } from 'utils/server-error-handler'
import { appActions } from './appSlice'

const login = (data: AuthRequestPayload): IThunk => {
	return dispatch => {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		authService
			.login(data)
			.then(res => {
				if (!res.data.resultCode) {
					dispatch(authActions.setLoginStatus({ isLoggedIn: true }))
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
				} else {
					appErrorHandler(res.data, dispatch)
				}
			})
			.catch(err => serverErrorHandler(err, dispatch))
	}
}

const authMe = (): IThunk => async dispatch => {
	try {
		const res = await authService.me()
		if (!res.data.resultCode) {
			dispatch(authActions.setLoginStatus({ isLoggedIn: true }))
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
	} finally {
		dispatch(appActions.setAppInitialized({ isInitialized: true }))
	}
}

const logout = (): IThunk => async dispatch =>
	authService
		.logOut()
		.then(res => {
			if (!res.data.resultCode) {
				dispatch(authActions.setLoginStatus({ isLoggedIn: false }))
			} else {
				appErrorHandler(res.data, dispatch)
			}
		})
		.catch(err => serverErrorHandler(err.message, dispatch))

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
	},
	reducers: {
		setLoginStatus(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
	selectors: {
		selectAuthIsLoggedIn: state => state.isLoggedIn,
	},
})

export const authActions = slice.actions
export const authThunks = { login, logout, authMe }
export const { selectAuthIsLoggedIn } = slice.selectors
export const authReducer = slice.reducer
