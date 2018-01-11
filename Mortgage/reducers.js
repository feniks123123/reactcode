import {
  INIT_STATE,

  ACTION_UPDATE_MORTGAGE_COUNT,
  ACTION_MORTGAGE_STEP,
  ACTION_MORTGAGE_ADD_USER_DATA,
  ACTION_MORTGAGE_SMS_REQUEST,
  ACTION_MORTGAGE_ERROR,
  ACTION_GET_PARTNERS,
  ACTION_MORTGAGE_INIT,
  ACTION_LENDING_OPTIONS,
  ACTION_GET_BLOCKS,
  ACTION_FILTER_PROGRAMS,
  ACTION_GET_SUBSIDIES,
  ACTION_CLEAR_MORTGAGE_DATA
} from './constants';

export const initMortgage = INIT_STATE;

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case ACTION_UPDATE_MORTGAGE_COUNT:
      return {
        ...state,
        mortgageCount: action.mortgageCount
      };
    case ACTION_MORTGAGE_STEP:
      return {
        ...state,
        step: action.step
      };
    case ACTION_MORTGAGE_ADD_USER_DATA:
      return {
        ...state,
        user: action.user
      };
    case ACTION_MORTGAGE_SMS_REQUEST:
      return {
        ...state,
        message: action.message
      };
    case ACTION_MORTGAGE_ERROR:
      return {
        ...state,
        error: action.error
      };
    case ACTION_GET_PARTNERS:
      return {
        ...state,
        partners: action.partners
      };
    case ACTION_MORTGAGE_INIT:
      return {
        ...state,
        mortgageInitValue: action.mortgageInitValue
      };
    case ACTION_LENDING_OPTIONS:
      return {
        ...state,
        lendingOptions: {
          ...state.lendingOptions,
          ...action.lendingOptions
        }
      };
    case ACTION_FILTER_PROGRAMS:
      return {
        ...state,
        filteredPrograms: action.filteredPrograms
      };
    case ACTION_GET_BLOCKS:
      return {
        ...state,
        blocks: action.blocks
      };
    case ACTION_GET_SUBSIDIES:
      return {
        ...state,
        subsidies: action.subsidies
      };
    case ACTION_CLEAR_MORTGAGE_DATA:
      return {
        ...state,
        ...INIT_STATE
      };
    default:
      return state;
  }
};