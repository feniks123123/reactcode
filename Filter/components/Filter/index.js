import React, { Component } from 'react';
import { connect } from 'react-redux';

import getInitData from '../../actions/getInitData';
import { updateValueWithComplexes } from './../../actions';

import LocationInput from '../LocationInput';
import ValueInput from '../PriceInput';
import SelectFilter from '../HandingInput';
import './styles.less';

class Filter extends Component {
  componentDidMount() {
    const { complexesList, dispatch } = this.props;
    if(complexesList && complexesList.main) {
      dispatch(getInitData());
    }
  }

  componentDidUpdate({ complexesList: prevComplexesList, showFullScreenMap: prevShowFullScreenMap }) {
    const { complexesList, dispatch, showFullScreenMap } = this.props;

    if(complexesList && prevComplexesList) {
      if(complexesList.main.length !== prevComplexesList.main.length) {
        dispatch(getInitData());
      }
    }

    if(prevShowFullScreenMap !== showFullScreenMap) {
      dispatch(updateValueWithComplexes({
        location : undefined,
        handing  : undefined,
        priceFrom: undefined,
        priceTo  : undefined
      }));
    }
  }

  render() {
    return (
      <div className='Filter'>
        <form className="Filter-form">
          <LocationInput/>
          <ValueInput/>
          <SelectFilter/>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    filter: { initData: { handingList } },
    complexes: {
      complexesList
    },
    map: { showFullScreenMap }
  } = state;

  return { complexesList, handingList, showFullScreenMap };
}

export default connect(mapStateToProps)(Filter);