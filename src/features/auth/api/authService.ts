import { instance } from 'common/api/common.api'
import { AuthRequestPayload } from 'common/types/IAuth'

interface IResponse<T = Record<string, never>> {
	resultCode: number
	messages: string[]
	data: T
}

interface IUserData {
	userId: number
}

interface IUserDataWithId {
	id: number
	email: string
	login: string
}
const AUTH = '/auth'
export const authService = {
	login(data: AuthRequestPayload) {
		return instance.post<IResponse<IUserData>>(`${AUTH}/login`, data)
	},
	me() {
		return instance.get<IResponse<IUserDataWithId>>(`${AUTH}/me`)
	},
	logOut() {
		return instance.delete<IResponse>(`${AUTH}/login`)
	},
}
