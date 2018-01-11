export const ACTION_INIT_LOCATION = 'ACTION_INIT_LOCATION';
export const ACTION_CHANGE_LOCATION = 'ACTION_CHANGE_LOCATION';
export const ACTION_SUNSET_START = 'ACTION_SUNSET_START';

export const INIT_STATE = {
  locations       : [],
  hideChangeRegion: false,
  sunsetStart     : null,
  currentLocation : {
    id       : 2,
    name     : 'Москва и область',
    locations: '2,3',
    url      : '',
    current  : true,
    types    : [ 1, 2, 4, 5, 6 ]
  }
};
