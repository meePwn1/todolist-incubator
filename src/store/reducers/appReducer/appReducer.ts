import { AppAction, AppActionTypes, IApp } from '../../../types/IApp'

const initialState: IApp = {
	status: 'loading',
	error: null,
}

export const appReducer = (
	state: IApp = initialState,
	action: AppAction
): IApp => {
	switch (action.type) {
		case AppActionTypes.SET_STATUS:
			return { ...state, status: action.status }
		case AppActionTypes.SET_ERROR:
			return { ...state, error: action.error }
		default:
			return state
	}
}
