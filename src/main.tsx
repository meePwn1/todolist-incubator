import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import AppWithRedux from './AppWithRedux.tsx'
import './index.css'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AppWithRedux />
	</Provider>

)
