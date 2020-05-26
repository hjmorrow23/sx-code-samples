import { createAction } from 'typesafe-actions';
import { DiscountIncludedProduct, DiscountConfig } from './reducers';
import { ToastErrorMessage } from '~/app/components/toast/sx-toast';
import { ToastId } from 'react-toastify';
import Countries from '~/app/api/clients/models/countries';

export const createDiscount = createAction('add_discount/CREATE_DISCOUNT', resolve => {
    return (discount: Models.DiscountRequest) => resolve(discount);
});

export const setDiscountConfig = createAction('add_discount/SET_DISCOUNT_CONFIG', resolve => {
    return (discountConfig: Partial<DiscountConfig>) => resolve(discountConfig);
}); 

export const removeDiscountConfigProduct = createAction('add_discount/REMOVE_DISCOUNT_CONFIG_PRODUCT', resolve => {
    return (productUUID: UUID) => resolve(productUUID);
});

export const setStep = createAction('add_discount/SET_STEP', resolve => {
    return (step: number) => resolve(step);
});

export const setLoading = createAction('add_discount/SET_LOADING', resolve => {
    return (loading: boolean) => resolve(loading);
});

export const resetState = createAction('add_discount/RESET_STATE', resolve => {
    return () => resolve();
});

export const setDiscountError = createAction('add_discount/SET_DISCOUNT_ERROR', resolve => {
    return (error: ToastErrorMessage) => resolve(error);
});

export const removeDiscountError = createAction('add_discount/REMOVE_DISCOUNT_ERROR', resolve => {
    return (id: ToastId) => resolve(id);
});

export const getProductRules = createAction('add_discount/GET_PRODUCT_RULES', resolve => {
    return () => resolve();
});

export const setProductRules = createAction('add_discount/SET_PRODUCT_RULES', resolve => {
    return (rules: Models.ProductRule[]) => resolve(rules);
});

export const setDiscountId = createAction('add_discount/SET_DISCOUNT_ID', resolve => {
    return (discountId: UUID) => resolve(discountId)
});

export const setPage = createAction('add_discount/SET_PAGE', resolve => {
    return (page: number) => resolve(page)
});

export const getCountries = createAction('add_discount/GET_COUNTRIES', resolve => {
    return () => resolve()
});

export const setCountries = createAction('add_discount/SET_COUNTRIES', resolve => {
    return (countries: Countries[]) => resolve(countries)
});


