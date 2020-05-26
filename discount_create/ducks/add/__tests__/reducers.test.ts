import addDiscountReducer, { addDiscountState } from '../reducers';
import { setDiscountConfig, removeDiscountConfigProduct, setStep,
    setLoading, resetState, setDiscountError, removeDiscountError, 
    setProductRules } from '../actions';

describe('Add Discount Reducer', () => {
    it('returns initial state', () => {
        expect(addDiscountReducer(undefined, {})).toEqual(addDiscountState);
    });

    it('resets state', () => {
        const action = resetState();
        expect(addDiscountReducer({...addDiscountState, flat: false}, action)).toEqual(addDiscountState);
    })

    describe('set discount config', () => {
        it('sets discount config state', () => {
            const action = setDiscountConfig({ name: 'test', value: 1000 });
            expect(addDiscountReducer(addDiscountState, action)).toEqual({ ...addDiscountState, name: 'test', value: 1000 });
        });
    });

    describe('remove discount from config', () => {
        it('removes discount from the state', () => {
            const sampleProduct = { id: 1, name: 'test', sku: '1234' };
            const testState = { ...addDiscountState, products: [sampleProduct] };
            const action = removeDiscountConfigProduct(1);
            expect(addDiscountReducer(testState, action)).toEqual(addDiscountState);
        });
    });

    describe('set step', () => {
        it('sets the step in the reducer', () => {
            const action = setStep(2);
            expect(addDiscountReducer(addDiscountState, action).step).toEqual(2);
        });
    })

    describe('set loading', () => {
        it('sets state', () => {
            const action = setLoading(true);
            expect(addDiscountReducer(addDiscountState, action).loading).toBe(true);
        });
    });

    describe('set discount error', () => {
        it('sets state', () => {
            const action = setDiscountError({level: 'warning', message: 'test'});
            const currentState = addDiscountReducer(addDiscountState, action);
            const errorID = currentState.errors[0].id;
            expect(currentState.errors[0]).toEqual({id: errorID, level: 'warning', message: 'test'});
        });
    });

    describe('remove discount error', () => {
        it('removes error', () => {
            // Set Error
            const setDiscountErrorAction = setDiscountError({level: 'warning', message: 'test'});
            let currentState = addDiscountReducer(addDiscountState, setDiscountErrorAction);
            const errorID = currentState.errors[0].id;
            expect(currentState.errors[0]).toEqual({id: errorID, level: 'warning', message: 'test'});

            // Remove Error
            const removeDiscountErrorAction = removeDiscountError(errorID);
            currentState = addDiscountReducer(currentState, removeDiscountErrorAction);
            expect(currentState.errors).toEqual([]);
        });
    });

    describe('set product rules', () => {
        it('sets rule state', () => {
            const productRule: Models.ProductRule = {
                id: 1,
                name: 'test rule',
                description: 'test rule description',
                query: '*',
            }
            const action = setProductRules([productRule]);
            expect(addDiscountReducer(addDiscountState, action).productRules).toStrictEqual([productRule]);
        });
    });
});
