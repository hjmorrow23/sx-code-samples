import {takeLatest, takeEvery} from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { getType } from 'typesafe-actions';

import { addDiscountSaga, getProductRulesSaga } from '../sagas';
import { getProductRules, createDiscount } from '../actions';
import { onAddDiscount, onGetProductRules } from '../effects';

describe('Discount Sagas', () => {
    describe('get product rules saga', () => {
        const generator = cloneableGenerator(getProductRulesSaga)();

        it('waits for get products rule call', () => {
            const clone = generator.clone();
            expect(clone.next().value).toEqual(takeLatest(getType(getProductRules), onGetProductRules));
            expect(clone.next().done).toBe(true);
        })
    });
    
    describe('add discount saga', () => {
        const generator = cloneableGenerator(addDiscountSaga)();

        it('waits for add discount', () => {
            const clone = generator.clone();
            expect(clone.next().value).toEqual(takeLatest(getType(createDiscount), onAddDiscount));
            expect(clone.next().done).toBe(true);
        });
    });
});