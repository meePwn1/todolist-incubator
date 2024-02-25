import { instance } from 'common/api/common.api'
import { AuthRequestPayload, BaseResponseType } from 'common/types'

interface IUserData {
	userId?: number
}

interface IUserDataWithId {
	id: number
	email: string
	login: string
}

const AUTH = '/auth'
export const authService = {
	login(data: AuthRequestPayload) {
		return instance.post<BaseResponseType<IUserData>>(`${AUTH}/login`, data)
	},
	me() {
		return instance.get<BaseResponseType<IUserDataWithId>>(`${AUTH}/me`)
	},
	logOut() {
		return instance.delete<BaseResponseType>(`${AUTH}/login`)
	},
}
