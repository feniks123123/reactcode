import React, { Component } from 'react';
import { connect } from 'react-redux';

import './styles.less';


class MortgageExpressContainer extends Component {


  render() {
    return (
      <div className="MortgageExpressContainer">
        <h2>Экспресс-кредит</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    geo: {
      locations,
      currentLocation
    },
    complexes: {
      complexesList
    },
    filter: {
      filtered
    }
  } = state;

  return { complexesList, locations, currentLocations: currentLocation.locations, filtered };
}

export default connect(mapStateToProps)(MortgageExpressContainer);