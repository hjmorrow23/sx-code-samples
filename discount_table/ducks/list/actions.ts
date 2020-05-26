import { createAction } from 'typesafe-actions';
import { ToastErrorMessage } from '~/app/components/toast/sx-toast';
import { ToastId } from 'react-toastify';

export const setPage = createAction('discounts/SET_PAGE', resolve => {
    return (page: number) => resolve(page);
})

export const onSelectVertical = createAction('discounts/SELECT_VERTICAL', resolve => {
    return (selectedVertical: string) => resolve(selectedVertical);
});

export const onSelectAmountType = createAction('discounts/SELECT_AMOUNT_TYPE', resolve => {
    return (amountType: string) => resolve(amountType);
});

export const setSearchText = createAction('discounts/SET_SEARCH_TEXT', resolve => {
    return (searchText: string) => resolve(searchText);
});

export const setStartDate = createAction('discounts/SET_START_DATE', resolve => {
    return (date: string) => resolve(date);
});

export const setEndDate = createAction('discounts/SET_END_DATE', resolve => {
    return (date: string) => resolve(date);
});

export const setDateFilter = createAction('discounts/SET_DATE_FILTER', resolve => {
    return (state: string) => resolve(state);
});

export const resetDateFilter = createAction('discounts/RESET_DATE_FILTER', resolve => {
    return () => resolve();
});

export const getDiscounts = createAction('discounts/GET_DISCOUNTS', resolve => {
    return () => resolve();
});

export const setDiscounts = createAction('discounts/SET_DISCOUNTS', resolve => {
    return (discounts: Models.Discount[]) => resolve(discounts);
});

export const setLoading = createAction('discounts/SET_LOADING', resolve => {
    return (loading: boolean) => resolve(loading);
});

export const setDiscountError = createAction('discounts/SET_DISCOUNT_ERROR', resolve => {
    return (error: ToastErrorMessage) => resolve(error);
});

export const removeDiscountError = createAction('discounts/REMOVE_DISCOUNT_ERROR', resolve => {
    return (id: ToastId) => resolve(id);
});

export const addDiscount = createAction('discounts/ADD_DISCOUNT', resolve => {
    return (discount: Models.Discount) => resolve(discount);
});

export const resetState = createAction('discount/RESET_STATE', resolve => {
    return () => resolve();
});
