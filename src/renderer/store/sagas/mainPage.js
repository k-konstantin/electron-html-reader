import {call, put, select, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'

import {createScreenShot} from '../../services/screenshots'
import {saveBase64ToImageFile} from '../actions'


export function* onFetchUsers(action) {
    try {
       console.log('START_TAKING_SCREENSHOT')
       const data = yield createScreenShot()
       yield put(saveBase64ToImageFile(data, Date.now().toString()))
       console.log(data)
    }
    catch (e) {
        console.log(e)
    }
}

export default [
    takeEvery('START_TAKING_SCREENSHOT', onFetchUsers),
]