import { compose } from 'lodash/fp';

import * as Actions from './actions';
import * as Reducers from './reducer-handlers';
import { getType, ActionType } from 'typesafe-actions';
import { withPages } from '../../common/pages/reducers';
import DATE_FILTER from '../../../containers/discount/list/date-filter';
import { withError, ErrorState } from '../../common/errors/reducers';
import { composer } from '../../composer';
import { withLoading, LoadingState } from '../../common/loading/reducers';

export interface DiscountsInitialState {
    selectedVertical: string,
    selectedAmountType: string,
    searchText: string,
    hasIncludedProducts: string,
    startDate?: string,
    endDate?: string,
    dateFilter: string,
    discounts: Models.Discount[],
    page: number,
}

export const discountsInitialState: DiscountsInitialState = {
    selectedVertical: '',
    selectedAmountType: '',
    searchText: '',
    hasIncludedProducts: '',
    startDate: undefined,
    endDate: undefined,
    dateFilter: DATE_FILTER.BEFORE,
    discounts: [],
    page: 1,
};

export type DiscountsState = DiscountsInitialState & LoadingState & ErrorState;

const reducer = (state: DiscountsInitialState = discountsInitialState, action: ActionType<typeof Actions>) => {
    switch (action.type) {
        case getType(Actions.onSelectVertical):
            return Reducers.onSelectVertical(state, action.payload);
        case getType(Actions.onSelectAmountType):
            return Reducers.onSelectAmountType(state, action.payload);
        case getType(Actions.setSearchText):
            return Reducers.setSearchText(state, action.payload);
        case getType(Actions.setStartDate):
            return Reducers.setStartDate(state, action.payload);
        case getType(Actions.setEndDate):
            return Reducers.setEndDate(state, action.payload);
        case getType(Actions.setDateFilter):
            return Reducers.setDateFilter(state, action.payload);
        case getType(Actions.resetDateFilter):
            return Reducers.resetDateFilter(state);
        case getType(Actions.setDiscounts):
            return Reducers.setDiscounts(state, action.payload);
        case getType(Actions.addDiscount):
            return Reducers.addDiscount(state, action.payload);
        case getType(Actions.resetState):
            return Reducers.resetState();
        default:
            return state;
    }
};

const combinedReducers = compose(
    withError({add: getType(Actions.setDiscountError), remove: getType(Actions.removeDiscountError)}),
    withLoading(getType(Actions.setLoading)),
    withPages(getType(Actions.setPage)),
)({ reducer, initialState: discountsInitialState});

export default composer(combinedReducers);
