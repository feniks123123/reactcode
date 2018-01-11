import React, { Component } from 'react';
import { connect } from 'react-redux';

import SeoMeta from '../../../../components/SeoMeta';

import MortgageAboutContainer from '../MortgageAboutContainer';
import MortgageSubsidiesContainer from '../MortgageSubsidiesContainer';
import MortgagePartnersContainer from '../MortgagePartnersContainer';
import MortgageExpressContainer from '../MortgageExpressContainer';
import MortgageLegislationContainer from '../MortgageLegislationContainer';
import MortgagePartnersProgramContainer from '../MortgagePartnersProgramContainer';

import getLocationName from '../../../../common/utils/getLocationName';

import { initMortgageData } from '../../actions/index';

class MortgageSwitchContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initMortgageData());
  }

  render() {
    let { propertyType, currentLocation } = this.props;
    let seo = {
      'title'      : `Ипотека – Купить квартиру в ипотеку в новостройках ${ getLocationName(currentLocation.id, 'rod').replace(/&nbsp;/gi, ' ') }. Ипотечный калькулятор онлайн`,
      'description': 'Помощь в получение ипотечного кредита на квартиру от банков партнеров. Продажа квартир по ипотеке с выгодными условиями и упрощенной схемой через группу компаний ПИК',
      'keywords'   : `продажа квартир по ипотеке в ${ getLocationName(currentLocation.id, 'dat').replace(/&nbsp;/gi, ' ') }`
    };

    if (propertyType === '') {
      propertyType = 'about';
    }

    const isMain = propertyType === 'about';
    const isSubsidies = propertyType === 'subsidies';
    const isPartners = propertyType === 'partners';
    const isLegislation = propertyType === 'legislation';
    const isProgram = propertyType === 'partnersProgram';
    const isCredit = propertyType === 'express-credit';

    if (isSubsidies) {
      seo = {
        'title'      : `Субсидии – Квартиры по субсидиям в новостройках ${ getLocationName(currentLocation.id, 'rod').replace(/&nbsp;/gi, ' ') }`,
        'description': `Субсидии – Квартиры по субсидиям в новостройках ${ getLocationName(currentLocation.id, 'rod').replace(/&nbsp;/gi, ' ') }`,
        'keywords'   : `квартиры по субсидиям в ${ getLocationName(currentLocation.id, 'dat').replace(/&nbsp;/gi, ' ') }`
      };
    }

    return (
      <div className="MortgageSwitchContainer">
        {!isProgram && <SeoMeta mortgage={ { ...seo } } />}
        {isMain && <MortgageAboutContainer/>}
        {isSubsidies && <MortgageSubsidiesContainer/>}
        {isPartners && <MortgagePartnersContainer/>}
        {isProgram && <MortgagePartnersProgramContainer/>}
        {isLegislation && <MortgageLegislationContainer/>}
        {isCredit && <MortgageExpressContainer/>}
      </div>
    );
  }
}

const mapStateToProps = ({ geo: { currentLocation } }) => ({ currentLocation });

export default connect(mapStateToProps)(MortgageSwitchContainer);