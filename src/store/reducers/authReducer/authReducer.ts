import { AuthAction, AuthActionTypes } from '../../../types/IAuth'

const initState = {
	isLoggedIn: false,
}
type InitState = typeof initState

export const authReducer = (
	state: InitState = initState,
	action: AuthAction
): InitState => {
	switch (action.type) {
		case AuthActionTypes.SET_LOGGED_IN:
			return { ...state, isLoggedIn: action.value }
		default:
			return state
	}
}
