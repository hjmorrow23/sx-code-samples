import { takeLatest } from 'redux-saga/effects';
import { createDiscount, getProductRules, getCountries } from './actions';
import { onAddDiscount, onGetProductRules, onGetCountries } from './effects';
import { getType } from 'typesafe-actions';

export function* getProductRulesSaga() {
    yield takeLatest(getType(getProductRules), onGetProductRules);
};

export function* addDiscountSaga() {
    yield takeLatest(getType(createDiscount), onAddDiscount);
};

export function* getCountriesSaga() {
    yield takeLatest(getType(getCountries), onGetCountries);
}
