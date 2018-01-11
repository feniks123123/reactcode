import { showLoading, hideLoading } from 'react-redux-loading-bar';
import fetchComplexes from './../../Complexes/actions/fetchComplexes';
import { actionGetComplexes } from './../../Complexes/actions';
import { filterLast, filterMain } from './../../Complexes/actions/utils/filterComplexes';

import {
  ACTION_GET_INIT_DATA,
  ACTION_SET_VALUE,
  ACTION_CLEAR_VALUE,
  ACTION_SET_FILTERED,
  ACTION_SHOW_FILTER,
  ACTION_FILTERED_COMPLEXES,
  ACTION_HIDE_FILTER
} from '../constants';

export function actionGetInitData(initData) {
  return {
    initData,
    type: ACTION_GET_INIT_DATA,
  };
}

export function actionSetValue(value) {
  return {
    type: ACTION_SET_VALUE,
    value
  };
}

export function actionClearValue() {
  return {
    type: ACTION_CLEAR_VALUE
  };
}

export function actionSetFiltered(filtered) {
  return {
    type: ACTION_SET_FILTERED,
    filtered
  };
}


export function actionFilteredComplexes(filteredComplexes) {
  return {
    type: ACTION_FILTERED_COMPLEXES,
    filteredComplexes
  };
}

export function actionShowFilter() {
  return {
    type: ACTION_SHOW_FILTER
  };
}

export function actionHideFilter() {
  return {
    type: ACTION_HIDE_FILTER
  };
}

export const updateFilteredComplexes = value => dispatch => {
  dispatch(actionSetValue(value));
  dispatch(getFilteredComplexes())
    .then(complexes => dispatch(actionFilteredComplexes(complexes)))
    .catch(err => console.log(err));
};

export const updateValueWithComplexes = value => dispatch => {
  dispatch(actionSetValue(value));
  dispatch(getFilteredComplexes())
    .then(complexes => dispatch(updateComplexesByFiler(complexes)))
    .catch(err => console.log(err));
};

const getFilteredComplexes = () => (dispatch, getState) => {
  const {
    filter: { value: { location, handing, priceTo, priceFrom } },
    geo: { currentLocation },
    complexes: { propertyType },
    map: { showFullScreenMap }
  } = getState();

  let lastParam = '&last_unfiltered=1';
  if (!!showFullScreenMap) {
    lastParam = '&last_unfiltered=0';
  }

const query = `&price_from=${ priceFrom }&price_to=${ priceTo }&settlement=${ handing }&price_million=0${ lastParam }`;
  dispatch(showLoading());

  return fetchComplexes(currentLocation.locations, query, propertyType)
    .then((complexes) => {
      let main = filterMain(complexes);
      let last = filterLast(complexes);
      dispatch(hideLoading());
      dispatch(actionSetFiltered(true));
      if (location) {
        main = main.filter(({ id }) => location.bulkIds.find((bulkId) => bulkId === id));
        if(!!showFullScreenMap) {
          last = last.filter(({ id }) => location.bulkIds.find((bulkId) => bulkId === id));
        } else {
          last = filterLast(complexes);
        }
      }
      return [ ...main, ...last ];
    })

    .catch(err => {
      console.log(err);
      dispatch(hideLoading());
    });
};

export const updateComplexesByFiler = complexes => dispatch => dispatch(actionGetComplexes(complexes));