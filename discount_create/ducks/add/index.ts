import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export const Actions = actions;
export type AddDiscountActions = ActionType<typeof actions>;
export type RemoveErrorHandler = typeof actions.removeDiscountError;
export type ResetStateHandler = typeof actions.resetState;
export type GetProductRulesHandler = typeof actions.getProductRules;
export type GetCountriesHandler = typeof actions.getCountries;
export type SetStepHandler = typeof actions.setStep;
export type SetDiscountConfigHandler = typeof actions.setDiscountConfig;
export type RemoveDiscountConfigProductHandler = typeof actions.removeDiscountConfigProduct;
export type SetPageAction = typeof actions.setPage;
export type CreateDiscountAction = typeof actions.createDiscount;