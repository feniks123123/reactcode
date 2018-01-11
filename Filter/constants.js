export const ACTION_GET_INIT_DATA = 'ACTION_GET_INIT_DATA';
export const ACTION_SET_VALUE = 'ACTION_SET_VALUE';
export const ACTION_CLEAR_VALUE = 'ACTION_CLEAR_VALUE';
export const ACTION_SET_FILTERED = 'ACTION_SET_FILTERED';
export const ACTION_SHOW_FILTER = 'ACTION_SHOW_FILTER';
export const ACTION_HIDE_FILTER = 'ACTION_HIDE_FILTER';
export const ACTION_FILTERED_COMPLEXES = 'ACTION_FILTERED_COMPLEXES';

export const INIT_STATE = {
  initData: {
    location: {
      locations       : [],
      defaultLocations: []
    },
    handingList: [],
  },
  value: {
    location : undefined,
    handing  : undefined,
    priceFrom: undefined,
    priceTo  : undefined
  },
  loader           : false,
  filtered         : false,
  filteredComplexes: null,
  error            : undefined,
  showFilter       : false
};