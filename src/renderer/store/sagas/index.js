import {all} from 'redux-saga/effects'
import mainPageSagas from './mainPage'

export default function* rootSaga() {
    yield all([
        ...mainPageSagas,
    ])
}