import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'

export const useActions = <T extends ActionCreatorsMapObject>(
	actions: T
): { [N in keyof T]: (...args: Parameters<T[N]>) => ReturnType<T[N]> } => {
	const dispatch = useDispatch()
	return useMemo(
		() =>
			bindActionCreators(actions, dispatch) as {
				[N in keyof T]: (...args: Parameters<T[N]>) => ReturnType<T[N]>
			},
		[actions, dispatch]
	)
}
