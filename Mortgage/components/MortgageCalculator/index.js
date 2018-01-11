import React, { Component } from 'react';
import { connect } from 'react-redux';

import LendingOptions from '../LendingOptions';
import SelectedPrograms from '../SelectedPrograms';
import Link from '../../../../components/Link';
import separatorPrice from '../../../../common/utils/separatorPrice';
import NothingToShow from '../../../../components/NothingToShow';

import isMobile from '../../../../common/utils/isMobile';
import isTablet from '../../../../common/utils/isTablet';
import animationScroll from '../../../../common/utils/animationScroll';


import './styles.less';
import clientRendering from '../../../../common/utils/clientRendering';

class MortgageCalculator extends Component {
  state = {
    isClient      : false,
    filterPrograms: false,
    focus         : false,
  };

  componentDidMount() {
    if(clientRendering) {
      this.setState({ isClient: true });
    }
  }

  render() {
    const { isClient } = this.state;
    let title = 'Ипотечный калькулятор';

    if(isMobile()) {
      title = 'Расчитать ипотеку';
    }

    return (
      <div id='MortgageCalculator' className='MortgageCalculator'>
        <div className='MortgageCalculator-container'>
          <h2 className='MortgageCalculator-title'>{ title }</h2>
          <div className='MortgageCalculator-wrapper'>
            <div className='MortgageCalculator-settings'>
              <h3 className='MortgageCalculator-settings-title'>Параметры кредитования</h3>
              <LendingOptions onBeforeChange={ this.focus } onAfterChange={ this.blur }/>
              { isTablet() && isClient ? this.renderBlockMobile() : this.renderBlockDesktop() }
            </div>
            { !isTablet() && isClient && this.renderProgramDesktop() }
          </div>
        </div>
        { !!isTablet() && isClient && this.renderProgramMobile() }
        <p className='MortgageCalculator-description'>Приведенные расчеты носят предварительный характер. Окончательный расчет суммы кредита и размер ежемесячного платежа производятся банком после предоставления полного комплекта документов и проведения оценки платежеспособности клиента.</p>
      </div>
    );
  }

  focus = (focus) => {
    this.setState({ focus });
  };

  blur = (focus) => {
    this.setState({ focus });
  };

  renderBlockDesktop() {
    const { mortgageSum } = this.props;
    return (
      <div>
        {/*<div className='MortgageCalculator-settings-block'>*/}
          {/*<p className='MortgageCalculator-settings-text'>Военная ипотека</p>*/}
          {/*/!*<Toogle/>*!/*/}
        {/*</div>*/}
        <div className='MortgageCalculator-settings-block'>
          <p className='MortgageCalculator-settings-text'>Сумма кредита</p>
          <p className='MortgageCalculator-settings-price'>{ separatorPrice(mortgageSum) } ₽</p>
        </div>
        <p className='MortgageCalculator-settings-description'>Приведенные расчеты носят предварительный характер. Окончательный расчет суммы кредита и размер ежемесячного платежа производятся банком после предоставления полного комплекта документов и проведения оценки платежеспособности клиента.</p>
        <a href=""
           onClick={ this.scrollToForm }
           className='MortgageCalculator-settings-link'>
          Подать заявку
        </a>
      </div>
    );
  }

  scrollToForm = e => {
    e.preventDefault();
    animationScroll(document.getElementById('ApplicationMortgage').offsetTop - 50, isMobile() ? 200 : 600);
  };


  renderProgramDesktop() {
    const { filteredPrograms } = this.props;
    const { focus } = this.state;

    let programShow = 'MortgageCalculator-program-glare';

    if(focus) {
      programShow = `${ programShow } ${ programShow }--active`;
    }

    if(!filteredPrograms) {
      return null;
    }

    return (
      <div className='MortgageCalculator-program'>
        <div className='MortgageCalculator-program-top'>
          <h3 className='MortgageCalculator-program-title'>Подобранные программы</h3>
          <Link to='/mortgage/partners' className='MortgageCalculator-program-link'>См.все</Link>
        </div>
        <div className={ programShow }>
          { !!filteredPrograms.length ? filteredPrograms.map((item, i) =>
            this.renderPartner(item, i + 1)) :
            <NothingToShow text = 'По заданным параметрам ничего не удалось подобрать'/> }
        </div>
      </div>
    );
  }

  renderPartner = (item, count) => {
    const { banks, currentLocation: { url } } = this.props;
    const { focus } = this.state;

    return <SelectedPrograms item={ item } key={ count } count={ count } region = { url } bank={ banks[ item.bankId ] } focus={ focus }/>;
  };

  renderBlockMobile() {
    const { mortgageSum } = this.props;
    return (
      <div className='MortgageCalculator-settings-block'>
        <div>
          <p className='MortgageCalculator-settings-text'>Сумма кредита</p>
          <p className='MortgageCalculator-settings-price'>{ separatorPrice(mortgageSum) } ₽</p>
        </div>
        <div>
          <a href=""
             onClick={ this.scrollToForm }
             className='MortgageCalculator-settings-link'>
            Подать заявку
          </a>
        </div>

      </div>
    );
  }

  renderProgramMobile() {
    const { filteredPrograms } = this.props;

    if(!filteredPrograms) {
      return null;
    }

    return (
      <div className='MortgageCalculator-program'>
        <div className='MortgageCalculator-container'>
          <div className='MortgageCalculator-program-top'>
            <h3 className='MortgageCalculator-program-title'>Подобранные программы</h3>
            <Link to='/mortgage/partners' className='MortgageCalculator-program-link'>См.все</Link>
          </div>
          <div className='MortgageCalculator-program-block'>
            { filteredPrograms.map((item, i) => this.renderPartner(item, i + 1)) }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    mortgage: {
      partners: {
        banks
      },
      filteredPrograms,
      lendingOptions: {
        mortgageSum
      }
    },
    geo: {
      currentLocation
    }
  } = state;


  return { filteredPrograms, banks, mortgageSum, currentLocation };
}

export default connect(mapStateToProps)(MortgageCalculator);