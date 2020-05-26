import { getErrors, getLoading, getStep, getDiscountConfig, getIsDiscountConfigNameValid, getIsDiscountConfigMinPriceValid, getIsDiscountConfigValueValid, getIsDiscountConfigUpperLimitValid, getProductRules } from "../selectors";
import { RootStateType } from "~/app/ducks/root/reducer";
import { AddDiscountState, AddDiscountInitialState } from "../reducers";

describe('Add Discount Selectors', () => {
    const initialState = {
        add_discount: {
            discountId: '0000-0000-000000-00000',
            discountPurpose: 'buying',
            discountVertical: [],
            name: '',
            value: 0,
            flat: true,
            minPrice: 0,
            upperLimit: 0,
            products: [],
            ruleId: undefined,
            productRules: [],
            // duplicated
            errors: [],
            loading: false,
            step: 1,
        }
    }

    const reduxState: {add_discount: AddDiscountState} = { 
        add_discount: {
            discountId: '0000-0000-000000-00000',
            discountPurpose: 'buying',
            discountVertical: [],
            name: 'test',
            value: 5,
            flat: false,
            minPrice: 10,
            upperLimit: 100,
            products: [],
            ruleId: undefined,
            productRules: [],
            // duplicated
            errors: [{level: 'warning', message: 'test', id: 1}],
            loading: true,
            step: 3,
        }
    };

    describe('getLoading', () => {
        it('returns initial state', () => {
            expect(getLoading(initialState)).toBeFalsy();
        });

        it('returns state', () => {
            expect(getLoading(reduxState)).toBe(true);
        });
    });

    describe('getErrors', () => {
        it('returns initial state', () => {
            expect(getErrors(initialState)).toEqual([]);
        });

        it('returns state', () => {
            expect(getErrors(reduxState)).toEqual([{level: 'warning', message: 'test'}]);
        });
    });

    describe('getStep', () => {
        it('returns initial state', () => {
            expect(getStep(initialState)).toBe(1);
        });

        it('returns state', () => {
            expect(getStep(reduxState)).toEqual(3);
        });
    });

    describe('getDiscountConfig', () => {
        it('returns state', () => {
            expect(getDiscountConfig(reduxState)).toEqual(reduxState.add_discount);
        });
    });

    describe('getIsDiscountConfigNameValid', () => {
        it('returns true if name is longer than 0 without spaces', () => {
            expect(getIsDiscountConfigNameValid(reduxState)).toBeTruthy();
        });

        it('returns false if name is less than 1 without spaces', () => {
            const data = { ...reduxState, add_discount: { ...reduxState.add_discount, name: '   '}};
            expect(getIsDiscountConfigNameValid(data)).toBeFalsy();
        })

        it('returns true if name is longer than 0 when spaces are removed', () => {
            const data = { ...reduxState, add_discount: { ...reduxState.add_discount, name: '  test     '}};
            expect(getIsDiscountConfigNameValid(data)).toBeTruthy();
        });
    });

    describe('getIsDiscoutnConfigMinPriceValid', () => {
        it('returns true if min value exists and is above 0', () => {
            expect(getIsDiscountConfigMinPriceValid(reduxState)).toBeTruthy();
        });

        const data = { ...reduxState, add_discount: { ...reduxState.add_discount, minPrice: -3}};
        it('returns false if min value is below 0', () => {
            expect(getIsDiscountConfigMinPriceValid(data)).toBeFalsy();
        });
    });

    describe('getIsDiscountConfigValueValid', () => {
        it('returns true if value exists and is above 0', () => {
            expect(getIsDiscountConfigValueValid(reduxState)).toBeTruthy();
        });

        const data = { ...reduxState, add_discount: { ...reduxState.add_discount, minPrice: -3}};
        it('returns false if value is below 0', () => {
            expect(getIsDiscountConfigValueValid(data)).toBeFalsy();
        });
    });

    describe('getIsDiscountConfigUpperLimitValid', () => {
        it('returns true if upper limit exists and is above 0', () => {
            expect(getIsDiscountConfigUpperLimitValid(reduxState)).toBeTruthy();
        });

        const data = { ...reduxState, add_discount: { ...reduxState.add_discount, upperLimit: -3}};
        it('returns true if flat is true regardless of upper limit', () => {
            expect(getIsDiscountConfigUpperLimitValid(data)).toBeFalsy();
        });

        const data2 = { ...reduxState, add_discount: { ...reduxState.add_discount, flat: false, upperLimit: -3}};
        it('returns false if flat is false and upper limit is below 1', () => {
            expect(getIsDiscountConfigUpperLimitValid(data)).toBeFalsy();
        });
    });

    describe('getProductRules', () => {
        it('returns state', () => {
            expect(getProductRules(reduxState)).toEqual(reduxState.add_discount.productRules);
        });
    });
});