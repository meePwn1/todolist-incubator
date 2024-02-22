import axios, { AxiosRequestConfig } from 'axios'

const API_URL = 'https://social-network.samuraijs.com/api/1.1'
const config: AxiosRequestConfig = {
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'API-KEY': 'f5f30e7a-dabc-45ea-84d4-2fbe9472188b',
	},
}

export const instance = axios.create({
	baseURL: API_URL,
	...config,
})
