import http from './../../../common/utils/http';

export default ({ realtyCost, initialPayment, period, locations, isMilitary }) => new Promise((reject, resolve) => {
  http.get(`/mortgage?&is_war=${ returnNum(isMilitary) }&realty_cost=${ realtyCost }&initial_payment=${ initialPayment }&period=${ period }&locations=${ locations }`)
    .then(resp => reject(resp))
    .catch(err => resolve(err));
});

function returnNum(isMilitary) {
  return isMilitary ? 1 : 0;
}