import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as taskActions from '../store/actions/tasksActions'
import * as todolistActions from '../store/actions/todolistsActions'

export const useTaskActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(taskActions, dispatch)
}

export const useTodoActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(todolistActions, dispatch)
}
