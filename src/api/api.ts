import axios from 'axios'

const TODO_URL = 'https://social-network.samuraijs.com/api/1.1'
const TASKS_URL = 'https://social-network.samuraijs.com/api/1.1/todo-lists/'
const config = {
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
}

export const axiosTodos = axios.create({
	baseURL: TODO_URL,
	...config,
})

export const axiosTasks = axios.create({
	baseURL: TASKS_URL,
	...config,
})
