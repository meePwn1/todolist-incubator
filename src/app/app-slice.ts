import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IApp, RequestStatusType } from 'common/types'

const initialState: IApp = {
	status: 'idle',
	error: null,
	isInitialized: false,
}
const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status
		},
		setAppError(state, action: PayloadAction<{ error: null | string }>) {
			state.error = action.payload.error
		},
		setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
			state.isInitialized = action.payload.isInitialized
		},
	},
	selectors: {
		selectAppStatus: state => state.status,
		selectAppError: state => state.error,
		selectAppInitialized: state => state.isInitialized,
		selectApp: state => state,
	},
})

export const appActions = slice.actions
export const { selectAppError, selectAppStatus, selectApp, selectAppInitialized } = slice.selectors
export const appReducer = slice.reducer

export type AppAction = ReturnType<(typeof appActions)[keyof typeof appActions]>
