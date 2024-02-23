import { LoginPage, NotFound, TodolistPage } from 'pages'

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
	{ path: `${BASE_URL}/login`, element: LoginPage, caseSensitive: true },
	{ path: '*', element: NotFound },
]
