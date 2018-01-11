import { actionGetInitData } from './index';
import http from './../../../common/utils/http';

function transformHanding(value) {
  const arr = value.split('.');
  return `${ arr[ 0 ] } квартал ${ arr[ 1 ] }`;
}

function getLocation(complexes) {
    const locations = complexes.reduce((acc, { id, metro, county, district, sort, locations: { child: { name } } }) => {
    const locationNameInAcc = acc.find(location => location.name === name);
    const metroNameInAcc = acc.find(location => location.name === metro);
    const countyNameInAcc = acc.find(location => location.name === `${ county } округ`);
    const districtNameInAcc = acc.find(location => location.name === district);

    if (!locationNameInAcc) {
      acc.push({ name, sort, metro: false, bulkIds: [ id ] });
    } else {
      locationNameInAcc.bulkIds = [ ...locationNameInAcc.bulkIds, id ];
    }

    if(!!metro){
      if (!metroNameInAcc) {
        acc.push({ name: metro, sort: null, metro: true, bulkIds: [ id ] });
      } else {
        metroNameInAcc.bulkIds = [ ...metroNameInAcc.bulkIds, id ];
      }
    }

    if(!!county){
      if (!countyNameInAcc) {
        acc.push({ name: `${ county } округ`, sort: null, metro: false, bulkIds: [ id ] });
      } else {
        countyNameInAcc.bulkIds = [ ...countyNameInAcc.bulkIds, id ];
      }
    }

    if(!!district){
      if (!districtNameInAcc) {
        acc.push({ name: district, sort: null, metro: false, bulkIds: [ id ] });
      } else {
        districtNameInAcc.bulkIds = [ ...districtNameInAcc.bulkIds, id ];
      }
    }
    return acc;
  }, []);

  const defaultLocations = locations.sort((a, b) => a.sort - b.sort).filter(({ sort }) => !!sort).slice(0, 5);

  return {
    locations,
    defaultLocations
  };
}

export default () => (dispatch, getState) => {
  const {
    complexes: {
      complexesList: { main, last }
    },
    geo: { currentLocation: { locations } },
    map: { showFullScreenMap }
  } = getState();

  let complexes = [];

  if (!!main) {
    complexes = main;
  }

  if (!!last && showFullScreenMap) {
    complexes = [ ...complexes, ...last ];
  }

  let location = getLocation(complexes);

  http.get(`/bulk/settlement?locations=${ locations }`)
    .then(rawList => {
      const handingList = [
        { id: 0, value: 'gone', name: 'Идет заселение' },
        { id: 1, value: '', name: 'Не важно' },
        ...rawList.map((value, i) => ({ id: i + 2, value, name: transformHanding(value) }))
      ];
      dispatch(actionGetInitData({ location, handingList }));
    })
    .catch(err => console.log(err));
};