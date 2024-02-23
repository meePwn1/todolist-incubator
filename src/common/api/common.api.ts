import axios from 'axios'

const API_URL = 'https://social-network.samuraijs.com/api/1.1'

export const instance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'API-KEY': 'f5f30e7a-dabc-45ea-84d4-2fbe9472188b',
	},
})
