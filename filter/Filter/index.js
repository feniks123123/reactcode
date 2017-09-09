import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationInput from '../LocationInput';
import ValueInput from '../ValueInput';
import SelectFilter from '../SelectFilter';

import './styles.less';

class ComplexesFilter extends Component {

  render() {
    return (
      <div className='ComplexesFilter'>
        <form className="ComplexesFilter-form">
          <LocationInput/>
          <ValueInput/>
          <SelectFilter/>
        </form>
      </div>
    );
  }

}

export default connect()(ComplexesFilter);
