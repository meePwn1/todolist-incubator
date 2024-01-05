import { legacy_createStore as createStore } from 'redux'
import { rootReducer } from './reducers'

export const store = createStore(rootReducer)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store
