
import { call, put } from 'redux-saga/effects';
import { setLoading, setProductRules, setDiscountError, setDiscountId, setCountries, resetState } from './actions';
import Api from '../../../api';
import console = require('console');

export function* onGetProductRules() {
    try {
        yield put(setLoading(true));
        const response = yield call(Api.Rules.getRules);
        yield put(setProductRules(response.data));
    }
    catch (e) {
        yield put(setLoading(false));
        yield put(setDiscountError({level: 'error', message: 'Something went wrong fetching product rules. Please try again'}));
    }
}

export function* onAddDiscount(discount) {
    try {
        yield put(setLoading(true));
        const response = yield call(Api.Discounts.addDiscount, discount.payload);
        yield put(setDiscountId(response.data.id));
    }
    catch (e) {
        console.log('error', e);
        yield put(setLoading(false));
        yield put(setDiscountError({level: 'error', message: 'Something went wrong when adding your discount. Please try again'}));
    }
}

export function* onGetCountries() {
    try {
        const response = yield call(Api.Countries.getCountries);
        yield put(setCountries(response.data));
    } catch (e) {
        yield console.log('error, e');
        yield put(setDiscountError({level: 'error', message: 'Something went wrong getting countries. Please try again'}));
    }
}
