// core
import { compose } from 'lodash/fp';


// local
import { setPage, withPageState } from '../../common/pages/reducers';
import DATE_FILTER from '../../../containers/discount/list/date-filter';
import { withLoadingState } from '../../common/loading/reducers';
import { discountsInitialState, DiscountsInitialState } from './reducers';
import { withErrorState } from '../../common/errors/reducers';

export const onSelectVertical = (state: DiscountsInitialState, selectedVertical: string) => {
    return setPage({...state, selectedVertical}, 1);
};

export const onSelectAmountType = (state: DiscountsInitialState, selectedAmountType: string) => {
    return setPage({...state, selectedAmountType}, 1);
};

export const setSearchText = (state: DiscountsInitialState, searchText: string) => {
    return setPage({...state, searchText}, 1);
};

export const setStartDate = (state: DiscountsInitialState, startDate: string) => {
    return setPage({...state, startDate}, 1);
};

export const setEndDate = (state: DiscountsInitialState, endDate: string) => {
    return setPage({...state, endDate}, 1);
};

export const setDateFilter = (state: DiscountsInitialState, dateFilter: string) => {
    return setPage({...state, dateFilter}, 1);
};

export const resetDateFilter = (state: DiscountsInitialState) => {
    return setPage({
        ...state,
        startDate: undefined,
        endDate: undefined,
        dateFilter: DATE_FILTER.BEFORE
    }, 1);
};

export const setDiscounts = (state: DiscountsInitialState, discounts: Models.Discount[]) => {
    return {
        ...state, 
        discounts: [...discounts]
    };
};

export const addDiscount = (state: DiscountsInitialState, discount: Models.Discount) => {
    return ({...state, discounts: [...state.discounts, discount]});
};

export const resetState = () => {
    return compose(
        withErrorState,
        withLoadingState,
        withPageState,
    )(discountsInitialState);
};
