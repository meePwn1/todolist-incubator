import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { useAction } from '../../hooks/useAction'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { privateRoutes, publicRoutes } from '../../router/routes'

const AppRouter = () => {
	const { isLoggedIn } = useTypedSelector(state => state.auth)
	const isInitialized = useTypedSelector(state => state.auth.isInitialized)
	const { authMeThunk } = useAction()
	useEffect(() => {
		authMeThunk()
	}, [])
	if (!isInitialized) {
		return (
			<div
				style={{
					position: 'fixed',
					top: '30%',
					left: '0px',
					textAlign: 'center',
					width: '100%',
				}}
			>
				<CircularProgress />
			</div>
		)
	}

	return isLoggedIn ? (
		<Routes>
			{publicRoutes.map(route => {
				return (
					<Route
						key={route.path}
						path={route.path}
						element={<route.element />}
						caseSensitive={route.caseSensitive}
					/>
				)
			})}
		</Routes>
	) : (
		<Routes>
			{privateRoutes.map(route => {
				return (
					<Route
						key={route.path}
						path={route.path}
						element={<route.element />}
						caseSensitive={route.caseSensitive}
					/>
				)
			})}
		</Routes>
	)
}

export default AppRouter
