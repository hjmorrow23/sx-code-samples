import { takeLatest } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { getType } from 'typesafe-actions';

import { getDiscountsSaga } from '../sagas';
import { getDiscounts } from '../actions';
import { onGetDiscounts } from '../effects';

describe('Discount Sagas', () => {
    describe('get discounts saga', () => {
        const generator = cloneableGenerator(getDiscountsSaga)();

        it('waits for get Discounts call', () => {
            const clone = generator.clone(); 
            expect(clone.next().value).toEqual(takeLatest(getType(getDiscounts), onGetDiscounts));
            expect(clone.next().done).toBe(true);
        });
    });
});
