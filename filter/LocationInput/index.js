import React, { Component } from 'react';
import { connect } from 'react-redux';

import Close from '../IconFilter/close';
import Metro from '../IconFilter/metro';
import { locationData } from './locationData';
import { county } from './county';

import { actionLocationInputFocus, actionLocationInputBlur } from '../../actions';

class LocationInput extends Component {

  state = {
    placeholderText: 'Где угодно',
    locationArray  : [],
    countyArray    : [],
    focus          : false,
    count          : 0,
    value          : ''
  };

  propsInput = {
    onFocus  : (event) => this.onFocusLong(event),
    onBlur   : () => this.onBlurLong(),
    onChange : (e) => this.handleChangeLong(e),
    onKeyDown: (event) => this.onKeyDownRight(event),
  };

  render() {
    const { placeholderText, value } = this.state;
    const { locationInput } = this.props;
    let long = 'ComplexesFilter-long';
    let input = 'ComplexesFilter-long-input';
    let select = 'ComplexesFilter-selectDropDown';

    if(locationInput) {
      long = `${ long } ${ long }-focus`;
      input = `${ input } ${ input }-focus`;
      select = `${ select } ${ select }--active`;
    }

    return(
      <div className={ long }>
        <span className="ComplexesFilter-description">Местоположение</span>
        <span className="ComplexesFilter-close"
              onClick={ () => this.clearInput() }>
              { !!value ? <Close/> : null }
            </span>
        <input type="text"
               { ...this.propsInput }
               className={ input }
               value={ value }
               placeholder={ placeholderText }/>
        <div className={ select }>
          <ul className="ComplexesFilter-selectDropDown-list">
            { this.renderList() }
          </ul>
        </div>
      </div>
    );
  }

  renderList(){
    const { countyArray, locationArray } = this.state;
    if(!!countyArray.length) {
      return countyArray.map((item, i) => this.renderCounty(item, i));
    }

    if(!!locationArray.length) {
      return locationArray.map((item, i) => this.renderSelectItem(item, i));
    }

    return county.map((item, i) => this.renderCounty(item, i));
  }

  renderCounty({ value }, i){
    let select = 'ComplexesFilter-selectDropDown-item';
    return (
      <li key={ i }
          value={ value }
          className={ select }
          onClick={ () => this.selectItem(value) }>
        { value }
      </li>
    );
  }

  renderSelectItem(item, i) {
    //временное решение для верстки
    let text = item.substring(0, 13);
    const { count } = this.state;

    let select = 'ComplexesFilter-selectDropDown-item';

    if (count === i + 1) {
      select = `${ select } ${ select }--active`;
    }

    return (
      <li key={ i }
          className={ select }
          onClick={ () => this.selectItem(text) }
          id={ i + 1 }>
        <div>
          <span className="ComplexesFilter-selectDropDown-item-icon"><Metro/></span>
          { text }
        </div>
        <div>
          <span className="ComplexesFilter-selectDropDown-item-object">12 объектов поблизости</span>
        </div>
      </li>
    );
  }

  selectItem(value){
    this.setState({ value });
    this.props.dispatch(actionLocationInputBlur());
  }

  clearInput(){
    this.setState({
      placeholderText: 'Где угодно',
      value          : '',
      countyArray    : [],
      locationArray  : []
    });
  }

  onFocusLong(event) {
    this.props.dispatch(actionLocationInputFocus());
    let input = event.currentTarget;
    if (input.placeholder === 'Где угодно') {
      this.setState({
        placeholderText: 'Район, метро',
      });
    }
  };

  onBlurLong() {
    const { value } = this.state;
    if (!value){
      this.setState({
        placeholderText: 'Где угодно',
      });
    }
   setTimeout(() => this.props.dispatch(actionLocationInputBlur()), 100);
  };

  onKeyDownRight(event) {
    const { value, countyArray, locationArray } = this.state;
    if (event.keyCode === 9 && !!value) {
      if (!!countyArray.length) {
        this.setState({ value: countyArray[ 0 ] });
      }
      if (!!locationArray.length) {
        this.setState({ value: locationArray[ 0 ] });
      }
    }
  }

  handleChangeLong(e) {
    const { countyArray } = this.state;

    let value = e.target.value;
    this.setState({ value });

    let district = county.filter((item) => {
      return item.value.includes(value);
    });

    this.setState({ countyArray: district });

    if (countyArray.length === 0) {
       let location = locationData.filter((item) => {
          return item.includes(value);
      });

    this.setState({ locationArray: location });
    }
  }
}

function mapStateToProps(state) {
  const {
    filter: { locationInput },
  } = state;

  return {
    locationInput
  };
}

export default connect(mapStateToProps)(LocationInput);