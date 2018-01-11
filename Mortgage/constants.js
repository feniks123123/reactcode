export const ACTION_UPDATE_MORTGAGE_COUNT = 'ACTION_UPDATE_MORTGAGE_COUNT';
export const ACTION_MORTGAGE_STEP = 'ACTION_MORTGAGE_STEP';
export const ACTION_MORTGAGE_ADD_USER_DATA = 'ACTION_MORTGAGE_ADD_USER_DATA';
export const ACTION_MORTGAGE_SMS_REQUEST = 'ACTION_MORTGAGE_SMS_REQUEST';
export const ACTION_MORTGAGE_ERROR = 'ACTION_MORTGAGE_ERROR';
export const ACTION_MORTGAGE_AUTH_KEY = 'ACTION_MORTGAGE_AUTH_KEY';
export const ACTION_GET_PARTNERS = 'ACTION_GET_PARTNERS';
export const ACTION_MORTGAGE_INIT = 'ACTION_MORTGAGE_INIT';
export const ACTION_LENDING_OPTIONS = 'ACTION_LENDING_OPTIONS';
export const ACTION_FILTER_PROGRAMS = 'ACTION_FILTER_PROGRAMS';
export const ACTION_GET_BLOCKS = 'ACTION_GET_BLOCKS';
export const ACTION_GET_SUBSIDIES = 'ACTION_GET_SUBSIDIES';
export const ACTION_CLEAR_MORTGAGE_DATA = 'ACTION_CLEAR_MORTGAGE_DATA';

export const INIT_STATE = {
  mortgageCount : null,
  step          : 'USER_DATA',
  user          : {},
  error         : null,
  message       : null,
  key           : null,
  partners      : {},
  blocks        : [],
  subsidies     : [],
  lendingOptions: {
    citizenship    : 'РФ',
    currencySelect : '%',
    currency       : 630000,
    currencyPercent: 30,
    cost           : 2100000,
    mortgagePeriod : 10,
    age            : 25,
    type           : 'percent',
    mortgageSum    : 1470000,
  },
  mortgageInitValue: {
    maxPeriod : 0,
    minPeriod : 30,
    maxSum    : 100000000,
    minSum    : 0,
    maxAge    : 74,
    minAge    : 18,
    maxPayment: 90,
    minPayment: 0
  },
  filteredPrograms: null,
};
