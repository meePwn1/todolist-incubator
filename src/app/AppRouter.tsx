import { CircularProgress } from '@mui/material'
import { selectAppInitialized } from 'app/app-slice'
import { useActions } from 'common/hooks/useActions'
import { privateRoutes, publicRoutes } from 'common/router/routes'
import { authSelectors, authThunks } from 'features/auth/model/authSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router'

const AppRouter = () => {
	const isLoggedIn = useSelector(authSelectors.selectAuthIsLoggedIn)
	const isInitialized = useSelector(selectAppInitialized)
	const { authMe } = useActions(authThunks)

	useEffect(() => {
		authMe()
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
					<Route key={route.path} path={route.path} element={<route.element />} caseSensitive={route.caseSensitive} />
				)
			})}
		</Routes>
	) : (
		<Routes>
			{privateRoutes.map(route => {
				return (
					<Route key={route.path} path={route.path} element={<route.element />} caseSensitive={route.caseSensitive} />
				)
			})}
		</Routes>
	)
}

export default AppRouter
