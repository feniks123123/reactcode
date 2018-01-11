import http from './../../../common/utils/http';

export default (locationsList) =>
  http.get(`/block?types=1,2&locations=${ locationsList }&metadata=1&statistics=1&images=1&is_subsidy=1`)
    .then(subsidies => subsidies)
    .catch(err => console.log(err));