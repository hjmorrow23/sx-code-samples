//core
import { compose } from "lodash/fp";

// local
import { setLoading, withLoadingState, LoadingState } from "../../common/loading/reducers";
import { setStep, withStepState } from "../../common/steps/reducers";
import { addDiscountState, DiscountConfig, AddDiscountState } from "./reducers";
import { withErrorState } from "../../common/errors/reducers";
import Countries from "~/app/api/clients/models/countries";

export const setDiscountConifg = (state: AddDiscountState, config: Partial<DiscountConfig>) => ({ ...state, ...config });

export const removeDiscountConfigProduct = (state: AddDiscountState, id: UUID) => {
    return {
        ...state,
        products: state.products.filter(product => product.id !== id),
    };
};

export const resetState = () => {
    return compose(
        withStepState,
        withErrorState,
        withLoadingState,
    )(addDiscountState);
};

export const setProductRules = (state: AddDiscountState & LoadingState, rules: Models.ProductRule[]) => {
    return { ...setLoading(state, false), 
        productRules: rules,
    }
};

export const setDiscountId = (state: AddDiscountState, id: UUID) => {
    return  {
        ...setStep(setLoading(state, false), 3),
        discountId: id,
    }
};

export const setCountries = (state: AddDiscountState, countries: Countries[]) => {
    return {
        ...state,
        countries
    }
}