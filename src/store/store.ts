import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { rootReducer } from './reducers'

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.store = store
