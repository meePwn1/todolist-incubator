import { axiosAuth } from '../api/authAPI'
import { AuthRequestPayload } from '../types/IAuth'

interface IResponse<T> {
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

export const authService = {
	login(data: AuthRequestPayload) {
		return axiosAuth.post<IResponse<IUserData>>(`login`, data)
	},
	me() {
		return axiosAuth.get<IResponse<IUserDataWithId>>('me')
	},
	logOut() {
		return axiosAuth.delete<IResponse<{}>>('login')
	},
}
