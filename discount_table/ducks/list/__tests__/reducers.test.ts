import { onSelectVertical, getDiscounts, setDiscounts, setLoading, 
    setDiscountError, removeDiscountError, addDiscount, resetState, onSelectAmountType, setSearchText, setPage, setStartDate, setEndDate, setDateFilter, resetDateFilter } from '../actions';
import discountReducer from '../reducers';
import DATE_FILTER from '../../../../containers/discount/list/date-filter';

describe('Discounts Reducer', () => {
    const initialState = {
        selectedVertical: '',
        selectedAmountType: '',
        searchText: '',
        page: 0,
        loading: false,
        discounts: [],
        errors: [],
        startDate: undefined,
        endDate: undefined,
        dateFilter: DATE_FILTER.BEFORE,
    };

    it('returns initial state', () => {
        expect(discountReducer(undefined, {})).toEqual(initialState);
    });

    describe('select vertical', () => {
        it('sets state', () => {
            const action = onSelectVertical('sneakers');
            expect(discountReducer(initialState, action).selectedVertical).toBe('sneakers');
        });
    });

    describe('select amount type', () => {
        it('sets state', () => {
            const action = onSelectAmountType('flat');
            expect(discountReducer(initialState, action).selectedAmountType).toBe('flat');
        });
    });

    describe('set search text', () => {
        it('sets state', () => {
            const action = setSearchText('searched text');
            expect(discountReducer(initialState, action).searchText).toEqual('searched text');
        });
    });

    describe('set start date', () => {
        it('sets start date state', () => {
            const action = setStartDate('date');
            expect(discountReducer(initialState, action).startDate).toEqual('date');
        });
    });

    describe('set start date', () => {
        it('sets end date state', () => {
            const action = setEndDate('date');
            expect(discountReducer(initialState, action).endDate).toEqual('date');
        });
    });

    describe('set start date', () => {
        it('sets start date state', () => {
            const action = setDateFilter('date');
            expect(discountReducer(initialState, action).dateFilter).toEqual('date');
        });
    });

    describe('reset date filter', () => {
        it('resets state', () => {
            const action = resetDateFilter();
            expect(discountReducer(initialState, action).startDate).toEqual(undefined);
        });
    });

    describe('set page', () => {
        it('sets state', () => {
            const action = setPage(4);
            expect(discountReducer(initialState, action).page).toEqual(4);
        })
    })
    
    describe('set discounts', () => {
        it('sets state', () => {
            const action = setDiscounts([{}, {}]);
            expect(discountReducer(initialState, action).discounts).toEqual([{}, {}]);
        });
    });

    describe('set loading', () => {
        it('sets state', () => {
            const action = setLoading(true);
            expect(discountReducer(initialState, action).loading).toBe(true);
        });
    });

    describe('set discount error', () => {
        it('sets state', () => {
            const action = setDiscountError({level: 'warning', message: 'test'});
            const currentState = discountReducer(initialState, action);
            const errorID = currentState.errors[0].id;

            expect(currentState.errors[0]).toEqual({id: errorID, level: 'warning', message: 'test'});
        });
    });

    describe('remove discount error', () => {
        it('removes error', () => {
            // Set Error
            const setDiscountErrorAction = setDiscountError({level: 'warning', message: 'test'});
            let currentState = discountReducer(initialState, setDiscountErrorAction);
            const errorID = currentState.errors[0].id;
            expect(currentState.errors[0]).toEqual({id: errorID, level: 'warning', message: 'test'});

            // Remove Error
            const removeDiscountErrorAction = removeDiscountError(errorID);
            currentState = discountReducer(currentState, removeDiscountErrorAction);
            expect(currentState.errors).toEqual([]);
        });
    });

    describe('get discounts', () => {
        it('sets state', () => {
            const action = getDiscounts();
            expect(discountReducer(initialState, action).loading).toBe(true);
        });
    });
    
    describe('add Discount', () => {
        it('sets state', () => {
            const action = addDiscount({});
            expect(discountReducer(initialState, action).discounts).toEqual([{}]);
        });
    });

    describe('reset state', () => {
        it('sets state', () => {
            const action = resetState();
            expect(discountReducer(initialState, action)).toEqual(initialState);
        });
    });
});