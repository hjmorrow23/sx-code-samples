import { call, put } from 'redux-saga/effects';
import { setLoading, setDiscounts, setDiscountError, resetState} from './actions';
import Api from '../../../api';

export function* onGetDiscounts() {
    try {
        yield put(resetState());
        yield put(setLoading(true));
        const response = yield call(Api.Discounts.getDiscounts);
        yield put(setDiscounts(response.data));
        yield put(setLoading(false));
    }
    catch (e) {
        yield put(setLoading(false));
        yield put(setDiscountError({level: 'error', message: 'Something went wrong fetching your discounts. Please try again'}));
    }
}

