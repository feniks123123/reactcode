import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateCurrentLocation } from '../../actions';
import { actionClearMortgageData } from '../../../Mortgage/actions';
import SelectLink from '../../../../components/SelectLink';

import './styles.less';

const ChangeRegion = ({ locations, currentLocation, history, hideChangeRegion, dispatch, match, propertyType, showFullScreenMap }) => {

  let locationsMap = [];

  let locationsCommerce = [];

  locations.map((item) => {
    if(!!~item.types.join().search(4)) {
      locationsCommerce.push({ id: item.id, name: item.name, locations: item.locations, url: `${ item.url }/commercial/#map` });
    }
  });

  locations.map((item) => {
    locationsMap.push({ id: item.id, name: item.name, locations: item.locations, url: `${ item.url }/#map` });
  });

  let loc = !!showFullScreenMap ? propertyType === 'commercial' ? locationsCommerce : locationsMap : locations;

  const handleChange = (value) => {
    history.push(value);
    dispatch(updateCurrentLocation(getNewLocation(value, locations)));
    dispatch(actionClearMortgageData());
  };

  let selectState;

  let geoLinks = loc.map((item) => {
    let id = item.id;
    let value = item.url;
    let text = item.name;

    if(id === 2) {
      if (!!showFullScreenMap) {

        if(propertyType === 'commercial') {
          return { id, value: '/commercial/#map', text };
        } else {
          return { id, value: '/#map', text };
        }
      }

      return { id, value: '/', text };
    }

    return { id, value, text };
  });

  if(match.url === '/' && currentLocation.locations !== '2,3'){
    handleChange(match.url);
  }

  selectState = currentLocation.url === '' ? '/' : currentLocation.url;

  if(!!showFullScreenMap) {
    if (propertyType === 'commercial') {
      selectState = currentLocation.url === '' ? '/commercial/#map' : `${ currentLocation.url }/commercial/#map`;
    } else {
      selectState = currentLocation.url === '' ? '/#map' : `${ currentLocation.url }/#map`;
    }
  }

  let changeRegionCss = 'ChangeRegion';

  if(hideChangeRegion) {
    changeRegionCss = 'ChangeRegion ChangeRegion-hide';
  }

  return (
    <div className={ changeRegionCss }>
     <svg width="10" height="11" viewBox="0 0 10 11" xmlns="http://www.w3.org/2000/svg"><path d="M5.18 10.347L9.757.59 0 5.167l4.737.494" fill="#484848" fillRule="evenodd"/></svg>
      <svg width="4" height="11" viewBox="0 0 4 11" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd" fillOpacity=".35"><path d="M2.003 0l2.002 3.67H0M2 10.667L4 7H0"/></g></svg>
      <SelectLink onChange={ handleChange }
                      optionsState={ selectState }
                      links={ geoLinks }/>
    </div>);
};

function getNewLocation(path, locations) {
  let location = locations.find(({ url }) => {
    if(!url) return false;
    return !!~path.search(new RegExp(url, 'ig'));
  });

  if(!location || path === '/') {
    location = locations.find(({ id }) => id === 2);
  }

  return location;
}

function mapStateToProps(state) {
  const {
    geo: {
      locations,
      currentLocation,
      hideChangeRegion
    },
    complexes: {
      propertyType
    },
    map : {
      showFullScreenMap
    }
  } = state;

  return { locations, currentLocation, hideChangeRegion, propertyType, showFullScreenMap };
}

export default withRouter(connect(mapStateToProps)(ChangeRegion));