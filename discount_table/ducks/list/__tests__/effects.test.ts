import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { setLoading, setDiscounts, setDiscountError, addDiscount, resetState, } from '../actions';
import Api from '../../../../api';
import { onGetDiscounts } from '../effects';

describe('Discounts Effects', () => {
    beforeEach(() => {
        Api.Discounts.getDiscounts = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    
    describe('on get discounts', () => {
        const generator = cloneableGenerator(onGetDiscounts)();
        it('sets loading and calls api for discounts', () => {
            const clone = generator.clone();
            const response = {
                data: 'YOLO'
            };

            expect(clone.next().value).toEqual(put(resetState()));
            expect(clone.next().value).toEqual(put(setLoading(true)));
            expect(clone.next().value).toEqual(call(Api.Discounts.getDiscounts));
            expect(clone.next(response).value).toEqual(put(setDiscounts('YOLO')));
            expect(clone.next().done).toBe(true);
        });

        it('sets discount error on throw', () => {
            const clone = generator.clone();

            expect(clone.next().value).toEqual(put(resetState()));
            expect(clone.next().value).toEqual(put(setLoading(true)));
            expect(clone.throw(new Error()).value).toEqual(put(setLoading(false)));
            expect(clone.next().value).toEqual(put(setDiscountError({level: 'error', message: 'Something went wrong fetching your discounts. Please try again'})));
            expect(clone.next().done).toBe(true);
        });
    });
});