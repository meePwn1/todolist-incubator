import NotFound from '../../components/NotFound/NotFound'
import TodolistPage from '../../features/TodolistsList/TodolistPage'
import { Login } from '../../features/auth/ui/login/Login'

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
