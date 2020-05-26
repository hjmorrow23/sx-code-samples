import { getLoading, getSelectedVertical, getDiscounts, getFilteredDiscounts, getSearchedDiscounts, getSearchText, getDateFilter, getStartDate, getEndDate } from '../selectors';
import DATE_FILTER from '../../../../containers/discount/list/date-filter';

describe('Discount Selectors', () => {
    const handbagDiscount = {
        id: '0eb64fec-013b-4430-aa02-012e12fa9f83',
        created_at: '2018-05-22T02:49:49.007775Z',
        updated_at: '2018-05-22T02:49:49.007775Z',
        name: '10% OFF',
        value: 0.1,
        flat: false,
        vertical_details: {
            handbags: {
                value: 0.1,
                flat: false,
                max_uses: 1,
                upper_limit: 1000000,
                min_price: 0
            }
        },
        skus: null,
        products: null,
        upper_limit: 1000000,
        min_price: 0,
        user_context: 'buying',
        has_customer_group: false,
        customer_uuids: null
    };

    const streetwearDiscount = {
        id: '0eb64fec-013b-4440-aa02-012e12fa9f83',
        created_at: '2018-05-22T02:49:49.007775Z',
        updated_at: '2018-05-22T02:49:49.007775Z',
        name: '10% OFF',
        value: 0.1,
        flat: false,
        vertical_details: {
            streetwear: {
                value: 0.1,
                flat: false,
                max_uses: 1,
                upper_limit: 1000000,
                min_price: 0
            }
        },
        skus: null,
        products: null,
        upper_limit: 1000000,
        min_price: 0,
        user_context: 'buying',
        has_customer_group: false,
        customer_uuids: null
    };

    const discounts = [
        handbagDiscount,
        streetwearDiscount
    ];

    const reduxState = {
        discounts: {
            loading: true,
            selectedVertical: 'sneakers',
            searchText: 'test',
            discounts,
            startDate: undefined,
            endDate: undefined,
            dateFilter: DATE_FILTER.BEFORE,
        }
    };

    describe('getLoading', () => {
        it('returns initial state', () => {
            expect(getLoading()).toBeFalsy();
        });

        it('returns state', () => {
            expect(getLoading(reduxState)).toBe(true);
        });
    });
    
    describe('getSelectedVertical', () => {
        it('returns state', () => {
            expect(getSelectedVertical(reduxState)).toBe('sneakers');
        });
    });
    
    describe('getDiscounts', () => {
        it('returns state', () => {
            expect(getDiscounts(reduxState).length).toBe(2);
        });
    });

    describe('getSearchText', () => {
        it('returns state', () => {
            expect(getSearchText(reduxState)).toBe('test');
        });
    });

    describe('getDateFilter', () => {
        it('returns date filter', () => {
            expect(getDateFilter(reduxState)).toBe(DATE_FILTER.BEFORE);
        });
    });

    describe('getStartDate', () => {
        it('returns start date', () => {
            expect(getStartDate(reduxState)).toBe(undefined);
        });
    });

    describe('getEndDate', () => {
        it('returns end date', () => {
            expect(getEndDate(reduxState)).toBe(undefined);
        });
    });

    describe('getSearchedDiscounts', () => {
        it('returns filtered discounts', () => {
            expect(getSearchedDiscounts(reduxState)).toEqual([]);
        });

        it('returns all if no search text entered', () => {
            const reduxStateSearchText = {
                discounts: {
                    selectedVertical: '',
                    searchText: '',
                    discounts
                }
            };
            expect(getSearchedDiscounts(reduxStateSearchText)).toEqual(discounts);
        })

        it('returns discounts matching search text', () => {
            const reduxStateSearchText = {
                discounts: {
                    selectedVertical: '',
                    searchText: '10',
                    discounts
                }
            };
            expect(getSearchedDiscounts(reduxStateSearchText)).toEqual(discounts);
        });
    });

    describe('getFilteredDiscounts', () => {
        it('returns nothing when no results for selected veritcal', () => {
            expect(getFilteredDiscounts(reduxState)).toEqual([]);
        });
        
        it('returns all results with no given vertical', () => {
            const reduxStateNoVertical = {
                discounts: {
                    loading: true,
                    discounts
                }
            };
            expect(getFilteredDiscounts(reduxStateNoVertical)).toEqual(discounts);
        });
        
        it('returns only results with given vertical', () => {
            const reduxStateHandbags = {
                discounts: {
                    loading: true,
                    discounts,
                    selectedVertical: 'handbags'
                }
            };
            expect(getFilteredDiscounts(reduxStateHandbags)).toEqual([handbagDiscount]);
        });

        it('returns only results with the given amount type', () => {
            const reduxStateHandbags = {
                discounts: {
                    loading: true,
                    discounts,
                    selectedAmountType: 'flat'
                }
            };
            expect(getFilteredDiscounts(reduxStateHandbags)).toEqual([]);
        });

        it('returns results BEFORE date 5/21', () => {
            const state = {
                discounts: {
                    loading: true,
                    discounts,
                    dateFilter: DATE_FILTER.BEFORE,
                    startDate: '2018-05-21',
                }
            };
            expect(getFilteredDiscounts(state)).toEqual([]);
        });

        it('returns results BEFORE date 5/23', () => {
            const state = {
                discounts: {
                    loading: true,
                    discounts,
                    dateFilter: DATE_FILTER.BEFORE,
                    startDate: '2018-05-23',
                }
            };
            expect(getFilteredDiscounts(state)).toEqual(discounts);
        });

        it('returns results AFTER date 5/21', () => {
            const state = {
                discounts: {
                    loading: true,
                    discounts,
                    dateFilter: DATE_FILTER.AFTER,
                    startDate: '2018-05-21',
                }
            };
            expect(getFilteredDiscounts(state)).toEqual(discounts);
        });

        it('returns results AFTER date 5/23', () => {
            const state = {
                discounts: {
                    loading: true,
                    discounts,
                    dateFilter: DATE_FILTER.AFTER,
                    startDate: '2018-05-23',
                }
            };
            expect(getFilteredDiscounts(state)).toEqual([]);
        });

        it('returns results BETWEEN 5/10 - 5/25', () => {
            const state = {
                discounts: {
                    loading: true,
                    discounts,
                    dateFilter: DATE_FILTER.BETWEEN,
                    startDate: '2018-05-10',
                    endDate: '2018-05-25',
                }
            };
            expect(getFilteredDiscounts(state)).toEqual(discounts);
        });

        it('returns results BETWEEN date 5/10 - 5/20', () => {
            const state = {
                discounts: {
                    loading: true,
                    discounts,
                    dateFilter: DATE_FILTER.BETWEEN,
                    startDate: '2018-05-10',
                    endDate: '2018-05-20',
                }
            };
            expect(getFilteredDiscounts(state)).toEqual([]);
        });
    });
});