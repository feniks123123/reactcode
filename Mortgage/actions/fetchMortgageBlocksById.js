import http from './../../../common/utils/http';

export default (guid, locationsList) =>
  http.get(`/block?mortgage_guid=${ guid }&locations=${ locationsList }&is_mainpage=1&types=1,2,3&metadata=1&images=1`)
    .then(blocks => blocks)
    .catch(err => console.log(err));