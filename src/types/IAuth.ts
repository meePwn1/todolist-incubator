import {
	setInitializeStatus,
	setLoginStatus,
} from '../store/actions/authActions'

export enum AuthActionTypes {
	SET_LOGGED_IN = 'SET_LOGGED_IN',
	SET_IS_INITIALIZED = 'SET_IS_INITIALIZED',
}
export interface AuthRequestPayload {
	email: string
	password: string
	rememberMe?: boolean
	captcha?: boolean
}

export type AuthAction =
	| ReturnType<typeof setLoginStatus>
	| ReturnType<typeof setInitializeStatus>
