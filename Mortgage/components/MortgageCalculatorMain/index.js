import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { withRouter } from 'react-router-dom';

import clientRendering from '../../../../common/utils/clientRendering';
import separatorPrice from '../../../../common/utils/separatorPrice';
import isMobile from '../../../../common/utils/isMobile';
import isLaptop from '../../../../common/utils/isLaptop';

import { getMortgageLoading, updateMortgageCount } from '../../actions';

import Tooltip from '../../../../components/Tooltip';

import './styles.less';

class MortgageCalculatorMain extends Component {
  state = {
    priceValue       : '',
    firstPaymentValue: '',
    periodValue      : '',
    isMilitary       : false
  };

  componentDidUpdate() {
    this.debounceUpdate();
  }

  render() {
    if (!isLaptop()) {
      return (
        this.renderDesktop()
      );
    } else {
      return (
        this.renderMobile()
      );
    }
  }

  renderDesktop() {
    return (
      <div className="MortgageCalculatorMain">
        <div className="MortgageCalculatorMain-wrapper">
          <div className="MortgageCalculatorMain-subtitle">
            Пик-ипотека
          </div>
          <h2 className="MortgageCalculatorMain-title">
            Ипотечный калькулятор
          </h2>
          {this.inputContainer()}
        </div>
      </div>
    );
  }

  renderMobile() {
    return (
      <div className="MortgageCalculatorMain">
        <div className="MortgageCalculatorMain-wrapper">
          <div className="MortgageCalculatorMain-subtitle">
            Пик-ипотека
          </div>
          <h2 className="MortgageCalculatorMain-title">
            Ипотечный калькулятор
          </h2>
        </div>
        <img
          src='//1.db-estate.cdn.pik-service.ru/attachment_pikru/0/0badc0dc-9c59-11e6-8483-001ec9d8c6a2/ipoteka-img_15b200dd79afec523757c1d6a0d2f855.jpg'
          alt="" className='MortgageCalculatorMain-images'/>
        <div className="MortgageCalculatorMain-wrapper">
          {this.inputContainer()}
        </div>
      </div>
    );
  }

  inputContainer() {
    const { priceValue, firstPaymentValue, periodValue } = this.state;
    return (
      <div className="MortgageCalculatorMain-calculator">
        {this.input(priceValue, '1 900 000', 'price', 'СТОИМОСТЬ НЕДВИЖИМОСТИ')}
        {this.input(firstPaymentValue, '600 000', 'firstPayment', 'ПЕРВОНАЧАЛЬНЫЙ ВЗНОС')}
        {this.input(periodValue, '10 лет', 'period', 'СРОК')}
        {this.button()}
      </div>
    );
  }

  input(value, placeholder, name, desc) {
    let css = 'MortgageCalculatorMain-inputContainer';
    let callback = this.handlerChange;
    let type = 'integer';

    if (name === 'period') {
      callback = this.handlerChangePeriod;
      type = 'text';
    }

    return (
      <div className={ css }>
        <input className="MortgageCalculatorMain-input"
               inputMode="numeric"
               name={ name }
               type={ type }
               value={ value }
               onChange={ callback }
               onFocus={ this.setDefaultValue }
               placeholder={ placeholder }/>
        <span className="MortgageCalculatorMain-description">{desc}</span>
      </div>
    );
  }

  handlerChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    e.preventDefault();
    value = value.replace(/\s/g, '');

    if (/\D/.test(value)) {
      return;
    }

    if (clientRendering) {
      if (Number(String(value).length) > 10) {
        return;
      }
    }

    this.setState({ [ `${ name }Value` ]: separatorPrice(value) });
    this.updateCount();
  };


  handlerChangePeriod = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    e.preventDefault();

    if (/\D/.test(value)) {
      return;
    }
    if (clientRendering) {
      if (Number(String(value).length) > 2) {
        return;
      }
    }
    this.setState({ [ `${ name }Value` ]: value });
  };

  debounceUpdate = debounce(() => this.updateCount(), 500);

  setDefaultValue = () => {
    const { priceValue, firstPaymentValue, periodValue } = this.state;

    const defaultValue = {
      price       : '1 900 000',
      firstPayment: '600 000',
      period      : '10'
    };

    if (!priceValue) {
      this.setState({ priceValue: defaultValue.price });
    }

    if (!firstPaymentValue) {
      this.setState({ firstPaymentValue: defaultValue.firstPayment });
    }

    if (!periodValue) {
      this.setState({ periodValue: defaultValue.period });
    }
  };

  updateCount = () => {
    const { priceValue, firstPaymentValue, periodValue, isMilitary } = this.state;
    const { locations, dispatch } = this.props;

    const params = {
      realtyCost    : priceValue.replace(/\s/g, ''),
      initialPayment: firstPaymentValue.replace(/\s/g, ''),
      period        : periodValue.replace(/\s/g, ''),
      isMilitary,
      locations
    };

    if (priceValue && firstPaymentValue && periodValue) {
      dispatch(updateMortgageCount(params));
    }
  };

  button() {
    const { mortgageCount } = this.props;
    const { priceValue, firstPaymentValue, periodValue } = this.state;
    let css = 'MortgageCalculatorMain-search';
    let text = 'Подобрать программу';
    let hasAllValue = priceValue && firstPaymentValue && periodValue;


    if (isLaptop() && !isMobile()) {
      text = 'Рассчитать';
    }

    if (hasAllValue && mortgageCount) {
      css = `${ css } ${ css }--active`;
    }

    if (mortgageCount !== null && hasAllValue) {
      text = `Показать ${ mortgageCount } программ`;
    }

    return (
      <div className='MortgageCalculatorMain-searchWrapper'>
        <button onClick={ this.handleButtonClick } className={ css }>{text}</button>
      </div>
    );
  }

  handleButtonClick = () => {
    const { priceValue, firstPaymentValue, periodValue } = this.state;
    const cost = Number(priceValue.replace(/ /g, ''));
    const currency = Number(firstPaymentValue.replace(/ /g, ''));
    const mortgagePeriod = Number(periodValue.replace(/ /g, ''));
    const currencyPercent = Math.round(currency * 100 / cost);

    this.props.dispatch(getMortgageLoading(this.props.history.push, {
        cost,
        currency,
        mortgagePeriod,
        currencyPercent
      }
    ));
  };


  militaryCalculator() {
    const { isMilitary } = this.state;
    let cssSwitch = 'MortgageCalculatorMain-switch';
    let cssQuestion = 'MortgageCalculatorMain-question';
    let svg = (<svg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
      <path d="M.6.6l4.8 4.8m0-4.8L.6 5.4" stroke="#484848" fill="none"/>
    </svg>);

    if (isMilitary) {
      cssSwitch = `${ cssSwitch } ${ cssSwitch }--red`;
      cssQuestion = `${ cssQuestion } ${ cssQuestion }--red`;
      svg = (<svg width="9" height="7" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg">
        <path d="M.852 3.263l2.55 2.64L8.147 1.19" stroke="#F34C10" fill="none"/>
      </svg>);
    }

    return (
      <div className="MortgageCalculatorMain-military">
        <button
          className={ cssSwitch }
          onClick={ this.handleClickMilitary }>
              <span
                className={ !isMilitary ? 'MortgageCalculatorMain-switch--round' : 'MortgageCalculatorMain-switch--round MortgageCalculatorMain-switch--roundMove' }>
                {svg}
              </span>
        </button>
        <span>Военная ипотека</span>
        <div className='MortgageCalculatorMain-military-tooltip'>
               <span data-tip="Военная ипотека" data-for='tooltipDefault'>
                 <svg
                   className={ cssQuestion }
                   width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="none"
                                                                                                    fillRule="evenodd"><path
                   fill="none" d="M0 0h20v20H0z"/><rect fillOpacity=".2" fill="#484848" width="20" height="20" rx="10"/><path
                   d="M9.888 5C8.785 5 7.918 5.446 7 6.277l.645.73c.88-.718 1.45-1.015 2.22-1.015.916 0 1.548.483 1.548 1.264 0 .77-.632 1.203-1.277 1.76-.967.844-1.14 1.178-1.14 2.108v.446h.88l.037-.36c.062-.67.372-.954.992-1.5.73-.67 1.636-1.29 1.636-2.48C12.54 5.78 11.315 5 9.89 5zm.2 7.66H8.82V14h1.265v-1.34z"
                   fill="#484848"/></g></svg>
               </span>
          <Tooltip id="tooltipDefault"/>
        </div>
      </div>
    );
  }

  handleClickMilitary = () => this.setState({ isMilitary: !this.state.isMilitary });
}

function mapStateToProps(state) {
  const {
    geo: {
      currentLocation: {
        locations
      }
    },
    mortgage: {
      mortgageCount
    }
  } = state;

  return { mortgageCount, locations };
}

export default withRouter(connect(mapStateToProps)(MortgageCalculatorMain));