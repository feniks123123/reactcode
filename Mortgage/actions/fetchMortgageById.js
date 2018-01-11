import http from './../../../common/utils/http';

export default (ids, types) =>
  http.get(`/mortgage?block_id=${ ids }&type=short&types=${ types }`)
    .then(mortgage => mortgage)
    .catch(err => console.log(err));