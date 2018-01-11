import fetchLocations from './fetchLocations';
import getDefaultCoordinates from '../utils/getDefaultCoordinates';
import sunsetCalc from '../utils/sunsetCalc';

import {
  ACTION_INIT_LOCATION,
  ACTION_CHANGE_LOCATION,
  ACTION_SUNSET_START
} from '../constants';

export function actionInitLocation(locations, currentLocation) {
  return {
    type: ACTION_INIT_LOCATION,
    locations,
    currentLocation
  };
}

export function actionSunsetStart(sunsetStart) {
  return {
    type: ACTION_SUNSET_START,
    sunsetStart
  };
}

function actionChangeLocation(currentLocation) {
  return {
    type: ACTION_CHANGE_LOCATION,
    currentLocation
  };
}

export const getLocations = path => dispatch => {
  fetchLocations(path)
    .then(({ locations, currentLocation }) => dispatch(actionInitLocation(locations, currentLocation)))
    .catch(err => console.log(err));
};

export const updateSunsetStart = locationId => dispatch => {
  const { latitude, longitude } = getDefaultCoordinates(locationId);
  const sunsetStart = sunsetCalc(latitude, longitude);;
  dispatch(actionSunsetStart(sunsetStart));
};

export const updateCurrentLocation = currentLocation => dispatch => {
  dispatch(actionChangeLocation(currentLocation));
  dispatch(updateSunsetStart(currentLocation.id));
};
