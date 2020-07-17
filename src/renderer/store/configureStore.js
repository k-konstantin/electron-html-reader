import { applyMiddleware, compose, createStore } from 'redux'
import globalDispatchMiddleware from 'redux-electron-global-dispatch'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import saga from './sagas'

const composeEnhancers = (process.env.NODE_ENV !== 'production') ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose
export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    let store

    if (window && window.process && window.process.type) {
        console.log('installed with global dispatch');
        store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware, globalDispatchMiddleware)))
    }
    else {
        console.log('installed no global dispatch');
        store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
    }

    sagaMiddleware.run(saga)
    
    return store
}