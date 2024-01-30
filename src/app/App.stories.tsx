import { ReduxStoreProviderDecorator } from '../stories/AppDecoratorForStories'
import { App } from './App'

export default {
	title: 'TODOLISTS/App',
	component: App,
	decorators: [ReduxStoreProviderDecorator],
}

export const AppBaseExample = () => {
	return <App />
}
