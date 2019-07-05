import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducers'
import globalDispatchMiddleware from 'redux-electron-global-dispatch'

const composeEnhancers = (process.env.NODE_ENV !== 'production') ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose
export default function configureStore() {
    let store

    if (window && window.process && window.process.type) {
        console.log('installed with global dispatch');
        store = createStore(reducer, composeEnhancers(applyMiddleware(globalDispatchMiddleware)))
    }
    else {
        console.log('installed no global dispatch');
        store = createStore(reducer, composeEnhancers(applyMiddleware()))
    }
    
    return store
}