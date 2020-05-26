import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';
import Fuse from 'fuse.js';
import moment from 'moment';
import DATE_FILTER from '../../../containers/discount/list/date-filter';
import { RootStateType } from '../../root/reducer';
import { DiscountsState } from './reducers';

const getStoreState:(params: RootStateType) => DiscountsState = ({ discounts }) => discounts;

const fuse = new Fuse<Models.Discount>([], {
    keys: ['name', 'value', 'min_purchase'],
    findAllMatches: true,
    threshold: .4,
});

export const getStartDate = createSelector(
    getStoreState,
    ({ startDate }) => startDate
);

export const getEndDate = createSelector(
    getStoreState,
    ({ endDate }) => endDate
);

export const getDateFilter = createSelector(
    getStoreState,
    ({ dateFilter }) => dateFilter
);

export const getLoading = createSelector(
    getStoreState,
    ({ loading }) => loading
);

export const getSelectedVertical = createSelector(
    getStoreState,
    ({ selectedVertical }) => selectedVertical
);

export const getSelectedAmountType = createSelector(
    getStoreState,
    ({ selectedAmountType }) => selectedAmountType
);

export const getDiscounts = createSelector(
    getStoreState,
    ({ discounts }) => discounts
);

export const getErrors = createSelector(
    getStoreState,
    ({ errors }) => errors
);

export const getPage = createSelector(
    getStoreState,
    ({ page }) => page
);

export const getDateSearch = createSelector(
    getStoreState,
    ({ startDate, endDate, dateFilter }) => {
        return {
            startDate: startDate,
            endDate: endDate,
            dateFilter: dateFilter
        }
    }
);

const filterByDate = (dateFilter, startDate, endDate, discount) => {
    switch (dateFilter) {
        case DATE_FILTER.BEFORE: {
            return moment(discount.created_at).isBefore(startDate);
        };
        case DATE_FILTER.AFTER: {
            if (!startDate) {
                return true;
            }
            return moment(discount.created_at).isAfter(startDate);
        };
        case DATE_FILTER.BETWEEN: {
            if (!startDate || !endDate) {
                return true;
            }
            return moment(discount.created_at).isBetween(startDate, endDate);
        };
        default: {
            return true;
        };
    }
}

export const getFilteredDiscounts = createSelector(
    getDiscounts,
    getSelectedVertical,
    getSelectedAmountType,
    getDateSearch,
    (discounts, vertical, amountType, dateSearch) => {
        const amountTypeFlat = amountType === 'percentage' ? false : true;
        const verticalFiltered = vertical ?
            discounts.filter(({ vertical_details }) => isEmpty(vertical_details) || Object.keys(vertical_details).includes(vertical)) :
            discounts;
        const dateFiltered = !!dateSearch.dateFilter ?
            verticalFiltered.filter((discount) => filterByDate(dateSearch.dateFilter, dateSearch.startDate, dateSearch.endDate, discount)) :
            verticalFiltered;
        return amountType !== undefined && amountType !== '' ?
            dateFiltered.filter(({ flat }) => amountTypeFlat === flat) : dateFiltered;
    }
);

export const getSearchText = createSelector(
    getStoreState,
    ({ searchText }) => searchText
);

export const getSearchedDiscounts = createSelector(
    getFilteredDiscounts,
    getSearchText,
    (discounts, searchText) => {
        if (!!!searchText || searchText === '') {
            return discounts;
        }
        fuse.setCollection(discounts);
        return fuse.search(searchText);
    }
);
