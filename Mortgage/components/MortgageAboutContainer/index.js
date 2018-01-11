import React from 'react';

import MortgageHeader from '../MortgageHeader';
import SimplyMakeUp from '../SimplyMakeUp';
import Partners from '../Partners';
import Feature from '../Feature';
import DocumentAccordion from '../DocumentAccordion';
import ApplicationMortgage from '../ApplicationMortgage';
import MortgageCalculator from '../MortgageCalculator';

import documents from './documentsData';
import './styles.less';

const MortgageAboutContainer = () => (
  <div className="MortgageAboutContainer">
    <MortgageHeader/>
    <div className='MortgageAboutContainer-simplyMakeUp'>
      <SimplyMakeUp title='Мы изменили ипотеку. Мы все упростили.'
                    text='Достаточно прийти к нам в офис. Мы подберем программы ипотечного кредитования, сделаем предварительный расчет ваших ипотечных платежей, поможем заполнить заявку на кредит и направим ее в наши банки-партнеры. После чего сами организуем проведение сделки на основе выбранной программы.'/>
    </div>
    <div className='MortgageAboutContainer-feature'>
      <Feature/>
    </div>
    <Partners/>
    <MortgageCalculator/>
    <div>
      <DocumentAccordion title = 'Перечень необходимых документов'/>
      <DocumentAccordion documents={ documents }
                         title = 'Законодательство'/>
    </div>
    <ApplicationMortgage/>
  </div>
);

export default MortgageAboutContainer;