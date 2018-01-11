import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import getLocationName from '../../../../common/utils/getLocationName';

import SimplyMakeUp from '../SimplyMakeUp';
import ObjectCard from '../ObjectCard';
import Outline from '../Outline';
import DocumentAccordion from '../DocumentAccordion';
import documentsData from './documentsData';

import './styles.less';

class MortgageSubsidiesContainer extends Component {

  render() {

    const { subsidies, locationId } = this.props;

    return (
      <div className="MortgageSubsidiesContainer">
        <SimplyMakeUp title = { `Квартиры по субсидиям в ${ getLocationName(locationId, 'dat') }` }
                      text = 'Группа компаний ПИК активно участвует в реализации программы Правительства г.Москвы о предоставлении субсидии на приобретение недвижимости, а также в реализации других Федеральных государственных программ и социальных выплат, предлагая широкий выбор квартир.'/>
        <div className="MortgageSubsidiesContainer-wrapper">
          { !!subsidies.length && <ObjectCard items = { subsidies } title = 'Реализуемые объекты' /> }
          <Outline/>
        </div>
        <div className="MortgageSubsidiesContainer-accordion">
          <DocumentAccordion type ='subsidies'
                             title = 'Перечень необходимых документов'/>
          <DocumentAccordion title = 'Законодательство'
                             documents={ documentsData }/>
        </div>
        <div className="MortgageSubsidiesContainer-wrapper">
          <div className="MortgageSubsidiesContainer-contacts">
            <p>Подробности по телефону: 8 (906) 034-51-79</p>
            <p>Адрес консультационного центра по субсидиям: г.Москва, ул. Кожевническая, д.1, стр.1, офис 606</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    geo: { currentLocation: { id } },
    mortgage: {
      subsidies
    }
  } = state;

  return { subsidies, locationId: id, };
}

export default withRouter(connect(mapStateToProps)(MortgageSubsidiesContainer));
