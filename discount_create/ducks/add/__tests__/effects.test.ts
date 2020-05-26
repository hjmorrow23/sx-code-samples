import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { setLoading, setDiscountError, setProductRules, setDiscountId } from '../actions';
import Api from '../../../../api';
import { onAddDiscount, onGetProductRules } from '../effects';
import { discount, productRule } from './mock-data';

describe('Discounts Effects', () => {
    beforeEach(() => {
        Api.Rules.getRules = jest.fn();
        Api.Discounts.addDiscount = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('on get product rules', () => {
        const generator = cloneableGenerator(onGetProductRules)();
        it('sets loading and calls api for product rules', () => {
            const clone = generator.clone();
            
            const response = {
                data: [productRule],
            };

            expect(clone.next().value).toEqual(put(setLoading(true)));
            expect(clone.next().value).toEqual(call(Api.Rules.getRules));
            expect(clone.next(response).value).toEqual(put(setProductRules([productRule])));
            expect(clone.next().done).toBe(true);
        });

        it('sets error on throw', () => {
            const clone = generator.clone();

            expect(clone.next().value).toEqual(put(setLoading(true)));
            expect(clone.throw && clone.throw(new Error()).value).toEqual(put(setLoading(false)));
            expect(clone.next().value).toEqual(put(setDiscountError({level: 'error', message: 'Something went wrong fetching product rules. Please try again'})));
        });
    });

    describe('on add discount', () => {
        const generator = cloneableGenerator(onAddDiscount)(discount);
        it('sets loading, and waits for the api to submit', () => {
            const clone = generator.clone();``
            const response = {
                data: [productRule]
            };
            expect(clone.next().value).toEqual(put(setLoading(true)));
            expect(clone.next().value).toEqual(call(Api.Discounts.addDiscount, discount));
            expect(clone.next(response).value).toEqual(put(setDiscountId(1)));
            expect(clone.next().done).toBe(true);
        });
        
        it('sets discount error on throw', () => {
            const clone = generator.clone();

            expect(clone.next().value).toEqual(put(setLoading(true)));
            expect(clone.throw && clone.throw(new Error()).value).toEqual(put(setLoading(false)));
            expect(clone.next().value).toEqual(put(setDiscountError({level: 'error', message: 'Something went wrong when adding your discount. Please try again'})));
            expect(clone.next().done).toBe(true);
        });
    });
})