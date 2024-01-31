import { axiosAuth } from '../api/authAPI'
import { AuthRequestPayload } from '../types/IAuth'

interface IResponse {
	resultCode: number
	messages: string[]
	data: {
		userId: number
	}
}

export const authService = {
	login(data: AuthRequestPayload) {
		return axiosAuth.post<IResponse>(`login`, data)
	},
}
