import {
  INIT_STATE,

  ACTION_INIT_LOCATION,
  ACTION_CHANGE_LOCATION,
  ACTION_SUNSET_START
} from './constants';

export const initGeo = INIT_STATE;

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTION_INIT_LOCATION:
      return {
        ...state,
        locations      : action.locations,
        currentLocation: action.currentLocation
      };
    case ACTION_CHANGE_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation
      };
    case ACTION_SUNSET_START:
      return {
        ...state,
        sunsetStart: action.sunsetStart
      };
    default:
      return state;
  }
};