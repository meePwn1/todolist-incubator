import { Login } from '../Pages/Login'
import TodolistPage from '../Pages/TodolistPage'
import NotFound from '../components/NotFound/NotFound'

interface IRoute {
	path: string
	element: React.ElementType
	caseSensitive?: boolean
}

const BASE_URL = 'todolist-incubator'

export const publicRoutes: IRoute[] = [
	{ path: `${BASE_URL}/`, element: TodolistPage, caseSensitive: true },
	{ path: `*`, element: NotFound, caseSensitive: true },
]

export const privateRoutes: IRoute[] = [
	{ path: `${BASE_URL}/login`, element: Login, caseSensitive: true },
	{ path: '*', element: Login },
]
