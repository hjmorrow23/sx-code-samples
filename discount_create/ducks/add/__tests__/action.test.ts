import { getType } from 'typesafe-actions';
import { createDiscount, setDiscountConfig, removeDiscountConfigProduct, 
    setStep, setLoading, resetState, getProductRules, setDiscountError,
    removeDiscountError, setProductRules,
} from '../actions';
import { ToastErrorMessage } from '~/app/components/toast/sx-toast';
import { discount } from './mock-data';

describe('Add Discount Actions', () => {
    describe('create discount', () => {
        const action = createDiscount(discount);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(createDiscount));
            expect(action.payload).toEqual(discount);
        });
    });

    describe('set discount config', () => {
        const action = setDiscountConfig({
            value: 10,
        });

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setDiscountConfig));
            expect(action.payload).toEqual({
                value: 10,
            });
        });
    });

    describe('remove discount config product', () => {
        const action = removeDiscountConfigProduct(1);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(removeDiscountConfigProduct));
            expect(action.payload).toEqual(1);
        });
    });

    describe('set add discount step', () => {
        const action = setStep(4);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setStep));
            expect(action.payload).toBe(4);
        });
    });

    describe('set loading', () => {
        const action = setLoading(false);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setLoading));
            expect(action.payload).toBe(false);
        });
    });

    describe('reset state', () => {
        const action = resetState();

        it('resets state', () => {
            expect(action.type).toEqual(getType(resetState));
        });
    });

    describe('set discount error', () => {
        const error: ToastErrorMessage = {
            message: 'test error',
            level: 'info',
        }
        const action = setDiscountError(error);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setDiscountError));
            expect(action.payload).toEqual(error);
        });
    });

    describe('remove discount error', () => {
        const action = removeDiscountError('test_id');

        it('returns the action', () => {
            expect(action.type).toEqual(getType(removeDiscountError));
            expect(action.payload).toEqual('test_id');
        });
    });

    describe('get product rules', () => {
        const action = getProductRules();

        it('returns the action', () => {
            expect(action.type).toEqual(getType(getProductRules));
        });
    });

    describe('set product rules', () => {

        const action = setProductRules([]);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setProductRules));
            expect(action.payload).toEqual([]);
        });
    });
});
