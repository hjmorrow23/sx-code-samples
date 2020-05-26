import { setDiscountConfig, removeDiscountConfigProduct, setStep, setLoading,
    resetState, setDiscountError, removeDiscountError, setProductRules, setDiscountId, setCountries
} from './actions';
import * as Reducers from './reducer-handlers';
import { getType } from 'typesafe-actions';
import { withSteps } from '../../common/steps/reducers';
import { withError, ErrorState } from '../../common/errors/reducers';
import { withLoading, LoadingState } from '../../common/loading/reducers';
import { composer } from '../../composer';
import { compose } from 'lodash/fp';
import { AddDiscountActions } from './index';

export interface DiscountIncludedProduct {
    id: UUID,
    name: string,
}

export interface DiscountConfig {
    discountPurpose: string,
    discountVertical: string[],
    discountId: UUID,
    name: string,
    value?: number,
    flat: boolean,
    minPrice?: number,
    upperLimit?: number,
    ruleId?: number,
    products: DiscountIncludedProduct[],
}

export type AddDiscountInitialState = DiscountConfig & {
    productRules: Models.ProductRule[],
    step: number,
}

export type AddDiscountState = AddDiscountInitialState & ErrorState & LoadingState;

export const addDiscountState: AddDiscountState = {
    discountPurpose: 'buying',
    discountVertical: [],
    discountId: '',
    name: '',
    value: undefined,
    flat: true,
    minPrice: undefined,
    upperLimit: undefined,
    products: [],
    ruleId: undefined,
    productRules: [],
    step: 1,
    loading: false,
    errors: [],
}

const reducer = (state: AddDiscountState = addDiscountState, action: AddDiscountActions) => {
    switch (action.type) {
        case getType(setDiscountConfig):
            return Reducers.setDiscountConifg(state, action.payload);
        case getType(removeDiscountConfigProduct):
            return Reducers.removeDiscountConfigProduct(state, action.payload);
        case getType(resetState):
            return Reducers.resetState();
        case getType(setProductRules):
            return Reducers.setProductRules(state, action.payload);
        case getType(setDiscountId):
            return Reducers.setDiscountId(state, action.payload);
        case getType(setCountries):
            return Reducers.setCountries(state, action.payload);
        default:
            return state;
    }
}

const combinedReducers = compose(
    withError({add: getType(setDiscountError), remove: getType(removeDiscountError)}),
    withSteps(getType(setStep)),
    withLoading(getType(setLoading)),
)({ reducer, initialState: addDiscountState });

export default composer(combinedReducers);
