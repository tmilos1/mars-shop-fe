import { put } from 'redux-saga/effects'
import * as actionTypes from '../actions'

function* fetchProducts(action) {
    // yield axios ...
    put({
        action: actionTypes.FINISH_PRODUCT_FETCHING
    })
}
