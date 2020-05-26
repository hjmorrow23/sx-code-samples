import { takeLatest } from 'redux-saga/effects';
import { getDiscounts} from './actions';
import { onGetDiscounts } from './effects';
import { getType } from 'typesafe-actions';

export function* getDiscountsSaga() {
    yield takeLatest(getType(getDiscounts), onGetDiscounts);
};
