import {call, put, select, takeEvery, delay} from 'redux-saga/effects'

import {createScreenShot} from '../../services/screenshots'
import {saveBase64ToImageFile, nextAnimation, takeScreenShot, stopScreenShot} from '../actions'
import {getSelectedResourceId, getAnimations, isTakingSreenshots, getFileNameFromSrc} from '../selectors'


export function* onFetchUsers(action) {
    try {
        console.log('START_TAKING_SCREENSHOT')
        const selectedId = yield select(getSelectedResourceId)
        const animations = yield select(getAnimations)
        const name = getFileNameFromSrc(animations[selectedId])

        const data = yield createScreenShot()
        yield put(saveBase64ToImageFile(data, name))

        if (selectedId < 10) {
            yield put(nextAnimation())
            yield delay(2000)
            const isScreenshotingActive = yield select(isTakingSreenshots)
            if (!isScreenshotingActive) {
                return
            }
            yield put(takeScreenShot())
        } else {
            yield put(stopScreenShot())
        }

    }
    catch (e) {
        console.log(e)
    }
}

export default [
    takeEvery('START_TAKING_SCREENSHOT', onFetchUsers),
]