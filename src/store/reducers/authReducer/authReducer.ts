import { AuthAction, AuthActionTypes } from '../../../types/IAuth'

const initState = {
	isLoggedIn: false,
	isInitialized: false,
}
type InitState = typeof initState

export const authReducer = (
	state: InitState = initState,
	action: AuthAction
): InitState => {
	switch (action.type) {
		case AuthActionTypes.SET_LOGGED_IN:
			return { ...state, isLoggedIn: action.value }
		case AuthActionTypes.SET_IS_INITIALIZED:
			return { ...state, isInitialized: action.value }
		default:
			return state
	}
}
