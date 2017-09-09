import fetchComplexBySlug from './../../modules/Complexes/actions/fetchComplexBySlug';
import fetchCurrentCommerceBlock from '../../modules/Commercial/actions/fetchCurrentCommerceBlock';
import fetchCommerceBlock from '../../modules/Commercial/actions/fetchCommerceBlock';
import fetchLocations from './../../modules/Geo/actions/fetchLocations';

export default (path, params, myCache) => new Promise((reject, resolve) => {
  myCache.get(path, (err, value) => {
    if (!!err) {
      return resolve(err)
    }
    if (value === undefined) {
      fetchData(path, params).then(data => {
        myCache.set(path, data);
        reject(data);
      })
        .catch(err => resolve(err));
    } else {
      reject(value);
    }
  });
});

function fetchData(path, params) {
  return Promise.all([
    fetchComplexBySlug(params.url),
    fetchLocations(path)
  ])
    .then(([{ id }, geo]) => {
      return Promise.all([
        fetchCurrentCommerceBlock(id),
        fetchCommerceBlock(id)
      ])
        .then(([currentCommerce, commerceBulks]) => (
          {
            geo,
            commerce: {
              currentCommerce,
              commerceBulks,
            }
          }
        ))
        .catch(err => err);
    })
    .catch(err => err);
}