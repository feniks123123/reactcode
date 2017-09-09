import {
  ACTION_GET_PARKING_BULK,
  ACTION_CLEAR_PARKING_BLOCK,
} from './../constants';

import fetchParking from './fetchParking';
import fetchComplexBySlug from '../../Complexes/actions/fetchComplexBySlug';
import fetchCurrentParking from './fetchCurrentParking';
import fetchMortgage from './fetchMortgage';
import fetchConditions from './fetchConditions';

export function actionClearParkingBlock() {
  return {
    type: ACTION_CLEAR_PARKING_BLOCK
  };
}

function actionGetParkingBulk(data) {
  return {
    data,
    type: ACTION_GET_PARKING_BULK,
  };
}

export const getParkingBulk = slug => dispatch => {
  return fetchComplexBySlug(slug)
    .then(({ id }) => {
      Promise.all([
        fetchParking(id),
        fetchCurrentParking(id),
        fetchConditions(id)
      ])
        .then(([ parkingBulks, currentParking, parkingConditions ]) =>
          ({ parkingBulks, currentParking, parkingConditions }))
        .then(data => fetchMortgage(getIds(data.currentParking))
          .then(parkingMortgage => ({ ...data, parkingMortgage })))
        .then(data => dispatch(actionGetParkingBulk(data)))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

function getIds(currentParking) {
  let ids = [];

  if (!!currentParking) {
    currentParking.forEach((item) => {
      if (!ids.length) {
        ids.push(item.bulk.id);
      }

      if (ids.find((num) => num !== item.bulk.id)) {
        ids.push(item.bulk.id);
      }
    });
  }
  return ids;
}