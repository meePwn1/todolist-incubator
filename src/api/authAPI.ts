import axios from 'axios'

const AUTH_URL = 'https://social-network.samuraijs.com/api/1.1/auth/'
const config = {
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
}

export const axiosAuth = axios.create({
	baseURL: AUTH_URL,
	...config,
})
