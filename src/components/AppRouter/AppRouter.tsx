import { CircularProgress } from '@mui/material'
import { selectAppInitialized } from 'app/appSlice'
import { useActions } from 'common/hooks/useActions'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { privateRoutes, publicRoutes } from 'common/router/routes'
import { authThunks } from 'features/auth/model/authSlice'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'

const AppRouter = () => {
	const { isLoggedIn } = useTypedSelector(state => state.auth)
	const isInitialized = useTypedSelector(selectAppInitialized)
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
