import { RootState } from 'app/store'
import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { v1 } from 'uuid'
import { tasksReducer } from '../store/reducers/taskReducer/taskReducer'
import { todolistReducer } from '../store/reducers/todolistReducer/todolistReducer'

const rootReducer = combineReducers({
	todos: todolistReducer,
	tasks: tasksReducer,
})

const initialGlobalState: RootState = {
	todos: [
		{ id: 'todolistId1', title: 'What to learn', filter: 'all' },
		{ id: 'todolistId2', title: 'What to buy', filter: 'all' },
	],
	tasks: {
		['todolistId1']: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: false },
		],
		['todolistId2']: [
			{ id: v1(), title: 'Milk', isDone: false },
			{ id: v1(), title: 'React Book', isDone: true },
		],
	},
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootState)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
