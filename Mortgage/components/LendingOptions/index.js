import React, { Component } from 'react';
import proschet from 'proschet';
import { connect } from 'react-redux';

import debounce from 'lodash.debounce';
import separatorPrice from '../../../../common/utils/separatorPrice';
import SliderInput from '../SliderInput';
import { updateLendingOptions } from '../../actions';

import './styles.less';


const citizenshipArray = [
  'РФ',
  'Иное'
];

const currencyArray = [
  {
    type: 'ruble',
    text: '₽'
  },
  {
    type: 'percent',
    text: '%'
  }
];

class LendingOptions extends Component{
  state = {
    focus          : true,
    citizenship    : 'РФ',
    currencySelect : '%',
    currency       : 630000,
    currencyPercent: 30,
    cost           : 2100000,
    mortgagePeriod : 10,
    age            : 25,
    type           : 'percent',
  };

  getYears = proschet([ 'год', 'года', 'лет' ]);

  render() {
    const { mortgageInitValue } = this.props;
    const { maxPeriod, minPeriod, maxSum, minSum, maxPayment, minPayment, maxAge, minAge } = mortgageInitValue;
    const { citizenship, currency, cost, mortgagePeriod, type, currencySelect, currencyPercent, age } = this.state;

    let max = cost * maxPayment / 100;
    let min = cost * minPayment / 100;
    let step = 100000;
    let calc = currency;
    let name = 'currency';

    if(type === 'percent') {
      max = maxPayment;
      min = minPayment;
      step = 1;
      name = 'currencyPercent';
      calc = currencyPercent;
    }

    return (
      <div className='LendingOptions'>
        <div className='LendingOptions-input'>
          <SliderInput description='Гражданство'
                       longSelect={ citizenshipArray }
                       name='citizenship'
                       value={ citizenship }
                       onChange={ this.handleChange }/>
        </div>
        <div className='LendingOptions-input'>
          <SliderInput description='Стоимость недвижимости'
                       name='cost'
                       max={ maxSum }
                       min={ minSum }
                       step={ 100000 }
                       onBeforeChange={ this.beforeChange }
                       onAfterChange={ this.afterChange }
                       onChange={ this.handleChange }
                       inputModificator={ value => separatorPrice(value) }
                       value={ cost }
                       onFocus={ this.focus }
                       onBlur={ this.blur }
                       validator={ value => this.validate(value, maxSum) }
                       rangeInput={ true }/>
        </div>
        <div className='LendingOptions-input'>
          <SliderInput description='Первоначальный взнос'
                       shortSelect={ currencyArray }
                       nameSelect='currencySelect'
                       name={ name }
                       max={ max }
                       min={ min }
                       step={ 5 }
                       type={ type }
                       valueSelect={ currencySelect }
                       value={ calc }
                       onBeforeChange={ this.beforeChange }
                       onAfterChange={ this.afterChange }
                       rangeInput={ true }
                       onFocus={ this.focus }
                       onBlur={ this.blur }
                       validator={ value => this.validate(value, max) }
                       inputModificator={ value => separatorPrice(value) }
                       onChange={ this.handleChange }/>
        </div>
        <div className='LendingOptions-input'>
          <SliderInput description='Срок'
                       name='mortgagePeriod'
                       max={ maxPeriod }
                       min={ minPeriod }
                       step={ 2 }
                       inputModificator={ value => `${ value } ${ this.getYears(value) }` }
                       validator={ value => this.validateYears(value, maxPeriod) }
                       value={ mortgagePeriod }
                       onBeforeChange={ this.beforeChange }
                       onAfterChange={ this.afterChange }
                       onFocus={ this.focus }
                       onBlur={ this.blur }
                       onChange={ this.handleChange }
                       rangeInput={ true }/>
        </div>
        <div className='LendingOptions-input'>
          <SliderInput description='Возраст'
                       name='age'
                       max={ maxAge }
                       min={ minAge }
                       step={ 1 }
                       onBeforeChange={ this.beforeChange }
                       onAfterChange={ this.afterChange }
                       inputModificator={ value => `${ value } ${ this.getYears(value) }` }
                       validator={ value => this.validateYears(value, maxAge) }
                       value={ age }
                       onFocus={ this.focus }
                       onBlur={ this.blur }
                       onChange={ this.handleChange }
                       rangeInput={ true }/>
        </div>
      </div>
    );
  }

  validate = (value, max) => {
    value = value.replace(/[^\d]/g, '');

    if(Number(value) > max) {
      return max;
    }

    return value;
  };

  validateYears = (value, max) => {
    value = value.replace(/[^\d]/g, '');

    if(Number(value) < 0) {
      return 0;
    }

    if(Number(value) > max) {
      return max;
    }

    return value;
  };

  beforeChange = () => {
    if (this.props.onBeforeChange) {
      this.setState({ focus: false });
      this.props.onBeforeChange(true);
    }
  };

  afterChange = (name, value) => {
    let val = isNaN(value) ? value : Number(value);
    if(this.props.onAfterChange) {
      this.setState({ focus: true });
      this.debounceFilter(name, val);
      this.props.onAfterChange(false);
    }
  };

  blur = (name, value, min) => {

    if(value === '') {
      this.setState({ [ name ]: min });
    }
  };

  handleChange = ({ value, name, type }) => {
    const { focus } = this.state;
    let val = isNaN(value) ? value : Number(value);
    if(name === 'currencySelect') {
      this.setState({
        type,
        [ name ]: value
      });
      this.debounceFilterType(type, name, val);
    } else {
      this.setState({ [ name ]: val });
      if(focus){
        this.debounceFilter(name, val);
      }
    }
  };

  debounceFilter = debounce((name, value) =>
    this.props.dispatch(updateLendingOptions({ [ name ]: value })), 300);

  debounceFilterType = debounce((type, name, value) =>
    this.props.dispatch(updateLendingOptions({ type, [ name ]: value })), 300);

}

function mapStateToProps(state) {
  const {
    mortgage: {
      mortgageInitValue,
    }
  } = state;

  return {
    mortgageInitValue,
  };
}

export default connect(mapStateToProps)(LendingOptions);