import React, { Component } from 'react';
import { connect } from 'react-redux';

import getInitData from '../../actions/getInitData';
import getLocationName from '../../../../common/utils/getLocationName';
import getProperty from '../../../../common/utils/getProperty';
import plural from '../../../../common/utils/pluaral';
import clientRendering from '../../../../common/utils/clientRendering';
import isIos from '../../../../common/utils/isIos';
import { updateFilteredComplexes, actionHideFilter, updateComplexesByFiler, actionClearValue } from './../../actions';

import LocationInput from '../LocationInput';
import ValueInput from '../PriceInput';
import SelectFilter from '../HandingInput';
import CloseMobile from '../icons/CloseMobile';
import animationScroll from '../../../../common/utils/animationScroll';

import './styles.less';

const pluralComplex = plural([ 'объект', 'объекта', 'объектов' ]);

class FilterMobile extends Component {
  componentDidMount() {
    const { complexesList, dispatch } = this.props;
    if (complexesList) {
      dispatch(getInitData());
    }
  }

  componentDidUpdate({ complexesList: prevComplexesList, active: prevActive, showFullScreenMap: prevShowFullScreenMap }) {
    const { complexesList, dispatch, active, showFullScreenMap } = this.props;

    if (complexesList && prevComplexesList) {
      if (complexesList.main.length !== prevComplexesList.main.length) {
        dispatch(getInitData());
      }
    }

    if(prevShowFullScreenMap !== showFullScreenMap) {
      dispatch(actionClearValue());
      dispatch(updateFilteredComplexes({
        location : undefined,
        handing  : undefined,
        priceFrom: undefined,
        priceTo  : undefined
      }));

      dispatch(getInitData());
    }

    if(clientRendering) {
      if (active && !prevActive) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        if (isIos()) {
          document.body.style.position = 'fixed';
        }
      }

      if(prevActive && !active) {
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.body.style.width = '';
        if (isIos()) {
          document.body.style.position = 'relative';
        }
      }
    }
  }

  render() {
    const { active, propertyType, locationId } = this.props;
    let css = 'FilterMobile';

    if (active) {
      css = `${ css } ${ css }--active`;
    }

    return (
      <div className={ css }>
        <div className='FilterMobile-wrapper'>
          <div className='FilterMobile-container-images'
               onClick={ this.hideFilter }>
            <CloseMobile/>
          </div>
          <h2 className='FilterMobile-title' dangerouslySetInnerHTML={ { __html: `${ getProperty(propertyType) } в ${ getLocationName(locationId, 'dat') }` } }/>
          <form onSubmit={ this.formSubmit }
                className="FilterMobile-form">
            <LocationInput/>
            <ValueInput/>
            <SelectFilter/>
            {this.renderButton()}
          </form>
        </div>
      </div>
    );
  }

  renderButton() {
    const { filteredComplexes, showFullScreenMap } = this.props;
    let count = [];

    if (!filteredComplexes) {
      return <button className='FilterMobile-button'>Показать</button>;
    }

    filteredComplexes.forEach((item) => {
      if(showFullScreenMap) {
        count.push(item);
      } else if(item.last === 0){
        count.push(item);
      }
    });

    return <button className='FilterMobile-button'>Показать { count.length } { pluralComplex(count.length) }</button>;
  }

  formSubmit = e => {
    e.preventDefault();
    const { filteredComplexes, dispatch } = this.props;
    this.hideFilter();

    if (filteredComplexes) {
      const menu = document.getElementsByClassName('ComplexesNav')[ 0 ];

      dispatch(updateComplexesByFiler(filteredComplexes));

      if(!!menu) {
        animationScroll(menu);
      }
    }
  };

  hideFilter = () => this.props.dispatch(actionHideFilter());
}


function mapStateToProps(state) {
  const {
    filter: {
      initData: { handingList },
      filteredComplexes,
    },
    complexes: {
      complexesList
    },
    geo: { currentLocation: { id } },
    map: { showFullScreenMap }
  } = state;

  return { complexesList, filteredComplexes, handingList, locationId: id, showFullScreenMap };
}

export default connect(mapStateToProps)(FilterMobile);