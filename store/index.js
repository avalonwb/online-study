import rootReducer from '../reducers/index'

import {
  persistStore
} from 'redux-persist'

import {
  createStore
} from 'redux'

const store = createStore(rootReducer)

export const initStore = () => {
  return store
}

export const persistor = persistStore(store)