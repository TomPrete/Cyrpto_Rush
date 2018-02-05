import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import btc from './btc'
import eth from './eth'
import krakenBTC from './krakenBTC'
import krakenETH from './krakenETH'
import returns from './returns'

const reducer = combineReducers({user, btc, eth, krakenBTC, krakenETH, returns})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './btc'
export * from './eth'
export * from './krakenBTC'
export * from './krakenETH'
export * from './returns'
