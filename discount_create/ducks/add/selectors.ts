import { createSelector } from 'reselect';
import { AddDiscountState } from './reducers';
import { RootStateType } from '../../root/reducer';

const getStoreState: (params: {add_discount: AddDiscountState}) =>  AddDiscountState = ({ add_discount }) => add_discount;

export const getLoading = createSelector(
    getStoreState,
    ({ loading }) => loading
);

export const getErrors = createSelector(
    getStoreState,
    ({ errors }) => errors
);

export const getStep = createSelector(
    getStoreState,
    ({ step }) => step
);

export const getDiscountConfig = createSelector(
    getStoreState,
    (discountConfig) => discountConfig
);

export const getIsDiscountConfigNameValid = createSelector(
    getStoreState,
    ({ name }) => name.trim().length > 0
);

export const getIsDiscountConfigMinPriceValid = createSelector(
    getStoreState,
    ({ minPrice }) => minPrice !== undefined && minPrice >= 0 && minPrice % 1 === 0
);

export const getIsDiscountConfigValueValid = createSelector(
    getStoreState,
    ({ value }) => value !== undefined && value > 0
);

export const getIsDiscountConfigUpperLimitValid = createSelector(
    getStoreState,
    ({ upperLimit, flat }) => flat || upperLimit !== undefined && upperLimit >= 0 && upperLimit % 1 === 0
);

export const getProductRules = createSelector(
    getStoreState,
    ({ productRules }) => productRules,
);

export const getDiscountId = createSelector(
    getStoreState,
    ({ discountId }) => discountId
);

export const getCurrentCountries = createSelector(
    getStoreState,
    ({ countries }) => countries
);
