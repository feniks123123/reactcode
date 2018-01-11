import {
  INIT_STATE,

  ACTION_GET_INIT_DATA,
  ACTION_SET_VALUE,
  ACTION_CLEAR_VALUE,
  ACTION_SET_FILTERED,
  ACTION_HIDE_FILTER,
  ACTION_FILTERED_COMPLEXES,
  ACTION_SHOW_FILTER
} from './constants';

export const initFilter = INIT_STATE;

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION_GET_INIT_DATA:
      return {
        ...state,
        initData: action.initData
      };
    case ACTION_SET_FILTERED:
      return {
        ...state,
        filtered: action.filtered
      };
    case ACTION_FILTERED_COMPLEXES:
      return {
        ...state,
        filteredComplexes: action.filteredComplexes
      };
    case ACTION_SET_VALUE:
      return {
        ...state,
        value: {
          ...state.value,
          ...action.value
        }
      };
    case ACTION_CLEAR_VALUE:
      return {
        ...state,
        value: {
          location : undefined,
          handing  : undefined,
          priceFrom: undefined,
          priceTo  : undefined
        }
      };
    case ACTION_SHOW_FILTER:
      return {
        ...state,
        showFilter: true
      };
    case ACTION_HIDE_FILTER:
      return {
        ...state,
        showFilter: false
      };
    default:
      return state;
  }
};