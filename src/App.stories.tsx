import AppWithRedux from './App'
import { ReduxStoreProviderDecorator } from './stories/AppDecoratorForStories'

export default {
	title: 'TODOLISTS/App',
	component: AppWithRedux,
	decorators: [ReduxStoreProviderDecorator],
}

export const AppBaseExample = () => {
	return <AppWithRedux />
}
