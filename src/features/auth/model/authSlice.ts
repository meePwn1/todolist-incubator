import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { appActions } from 'app/app-slice'
import { ResultCode } from 'common/enums'
import { AuthRequestPayload } from 'common/types'
import { appErrorHandler } from 'common/utils/app-error-handler'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { thunkTryCatch } from 'common/utils/thunk-try-catch'
import { todolistsActions } from 'features/TodolistsList/model/todolistsSlice'
import { authService } from 'features/auth/api/authService'

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, AuthRequestPayload>('auth/login', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	return thunkTryCatch(thunkAPI, async () => {
		const res = await authService.login(arg)
		if (res.data.resultCode === ResultCode.Success) {
			return { isLoggedIn: true }
		} else {
			appErrorHandler(res.data, dispatch, false)
			return rejectWithValue(res.data)
		}
	})
})

const authMe = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/authMe', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	return thunkTryCatch(thunkAPI, async () => {
		const res = await authService.me()
		if (res.data.resultCode === ResultCode.Success) {
			return { isLoggedIn: true }
		} else {
			appErrorHandler(res.data, dispatch, false)
			return rejectWithValue(null)
		}
	}).finally(() => {
		dispatch(appActions.setAppInitialized({ isInitialized: true }))
	})
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }>('auth/logout', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	return thunkTryCatch(thunkAPI, async () => {
		const res = await authService.logOut()
		if (res.data.resultCode === ResultCode.Success) {
			dispatch(todolistsActions.clearState())
			return { isLoggedIn: false }
		} else {
			appErrorHandler(res.data, dispatch)
			return rejectWithValue(null)
		}
	})
})

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
	},
	reducers: {},
	selectors: {
		selectAuthIsLoggedIn: state => state.isLoggedIn,
	},
	extraReducers: builder => {
		builder.addMatcher(isFulfilled(authThunks.login, authThunks.logout, authThunks.authMe), (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
	},
})

export const authThunks = { login, logout, authMe }
export const authSelectors = slice.selectors
export const authReducer = slice.reducer
