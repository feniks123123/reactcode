import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import Script from 'react-load-script';

import clientRendering from '../../../../common/utils/clientRendering';

const YandexApi = (props) => {
  return null;
  // return (
  //   <Script
  //     url="//api-maps.yandex.ru/2.0/?load=package.standard&lang=ru-RU"
  //     onLoad={ () => handleLoad(props) }
  //   />
  // );
};

const handleLoad = props => {
  ymaps.ready(function () {
    handleRedirect(props, ymaps.geolocation);
  });
};

const handleRedirect = (props, geoLocation) => {
  const { location: { pathname }, history } = props;
  if (clientRendering) {
    if (pathname === '/') {
      findRegion(geoLocation, history.push);
    }
  }
};

const findRegion = (geo, push) => {
  const { city, region } = geo;

  if(city === 'Санкт-Петербург' || region === 'Санкт-Петербург и Ленинградская область') {
    push('/spb');
  }

  if(city === 'Калуга' || region === 'Ростов-на-Дону и Калужская область') {
    push('/kaluga');
  }

  if(city === 'Обнинск') {
    push('/obninsk');
  }

  if(city === 'Ростов-на-Дону' || region === 'Ростов-на-Дону и Ростовская область') {
    push('/rostov-na-donu');
  }

  if(city === 'Новороссийск' || region === 'Новороссийск и Краснодарский край') {
    push('/novorossiisk');
  }

  if(city === 'Ярославль' || region === 'Ярославль и Ярославская область') {
    push('/yaroslavl');
  }

  if(city === 'Пермь' || region === 'Пермь и Пермский край') {
    push('/perm');
  }
};

function mapStateToProps(state) {
  const {
    geo: {
      sunsetStart,
      currentLocation: { id: locationId }
    }
  } = state;

  return { locationId, sunsetStart };
}

export default withRouter(connect(mapStateToProps)(YandexApi));