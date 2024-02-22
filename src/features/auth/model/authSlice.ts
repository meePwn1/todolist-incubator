import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthRequestPayload } from 'common/types/IAuth'
import { appErrorHandler } from 'common/utils/app-error-handler'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { serverErrorHandler } from 'common/utils/server-error-handler'
import { authService } from 'features/auth/api/authService'
import { appActions } from '../../../app/appSlice'

const login = createAppAsyncThunk<unknown, AuthRequestPayload>('auth/login', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await authService.login(arg)
		if (!res.data.resultCode) {
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			dispatch(slice.actions.setIsLoggedIn({ isLoggedIn: true }))
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	}
})

const authMe = createAppAsyncThunk('auth/authMe', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await authService.me()
		if (!res.data.resultCode) {
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			dispatch(slice.actions.setIsLoggedIn({ isLoggedIn: true }))
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppInitialized({ isInitialized: true }))
	}
})
const logout = createAppAsyncThunk('auth/logout', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await authService.logOut()
		if (!res.data.resultCode) {
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			dispatch(slice.actions.setIsLoggedIn({ isLoggedIn: false }))
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (error) {
		serverErrorHandler(error, dispatch)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
	},
	reducers: {
		setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
	selectors: {
		selectAuthIsLoggedIn: state => state.isLoggedIn,
	},
})

export const authThunks = { login, logout, authMe }
export const authSelectors = slice.selectors
export const authReducer = slice.reducer
