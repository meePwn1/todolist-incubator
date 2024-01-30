import {
	setAppErrorAction,
	setAppStatusAction,
} from '../store/actions/appActions'

export enum AppActionTypes {
	SET_STATUS = 'APP/SET_STATUS',
	SET_ERROR = 'APP/SET_ERROR',
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface IApp {
	status: RequestStatusType
	error: string | null
}

export type AppAction =
	| ReturnType<typeof setAppStatusAction>
	| ReturnType<typeof setAppErrorAction>
