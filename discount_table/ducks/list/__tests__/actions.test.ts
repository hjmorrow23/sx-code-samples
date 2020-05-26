import { onSelectVertical, getDiscounts, setDiscounts, setLoading, 
    setStep, addDiscount, generateCode,
} from '../actions';
import { getType } from 'typesafe-actions';

describe('Discount Actions', () => {
    describe('on select vertical', () => {
        const action = onSelectVertical('sneakers');

        it('returns the action', () => {
            expect(action.type).toEqual(getType(onSelectVertical));
            expect(action.payload).toEqual('sneakers');
        });
    });

    describe('get discounts', () => {
        const action = getDiscounts('sneakers');

        it('returns the action', () => {
            expect(action.type).toEqual(getType(getDiscounts));
        });
    });

    describe('set discounts', () => {
        const action = setDiscounts([{}]);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setDiscounts));
            expect(action.payload).toEqual([{}]);
        });
    });

    describe('set loading', () => {
        const action = setLoading(false);

        it('returns the action', () => {
            expect(action.type).toEqual(getType(setLoading));
            expect(action.payload).toBe(false);
        });
    });

    describe('add discount', () => {
        const action = addDiscount({});

        it('returns the action', () => {
            expect(action.type).toEqual(getType(addDiscount));
            expect(action.payload).toEqual({});
        });
    });
});