import { AppActionTypes, RequestStatusType } from '../../types/IApp'

export const setAppStatusAction = (status: RequestStatusType) => {
	return {
		type: AppActionTypes.SET_STATUS,
		status,
	} as const
}

export const setAppErrorAction = (error: string | null) => {
	return {
		type: AppActionTypes.SET_ERROR,
		error,
	} as const
}
