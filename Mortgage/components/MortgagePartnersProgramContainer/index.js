import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScrollToTopOnMount from '../../../../components/ScrollToTopOnMount';

import SeoMeta from '../../../../components/SeoMeta';
import getLocationName from '../../../../common/utils/getLocationName';

import MortgageProgramBanner from '../MortgageProgramBanner';
import ConditionsCredit from '../ConditionsCredit';
import ObjectCard from '../ObjectCard';
import OthersProgram from '../OthersProgram';
import { getBlocks } from '../../actions';

import './styles.less';

class MortgagePartnersProgramContainer extends Component {

  componentDidMount() {
    const { match: { params: { programId } }, dispatch } = this.props;
    dispatch(getBlocks(programId));
  }

  render() {
    const { programs, banks, match, blocks, currentLocation, } = this.props;
    let guid;
    let bank;
    let program;

    let otherPrograms = [];

    if (!programs) {
      return null;
    }

    if (!!match) {
      guid = match.params.programId;

      program = programs[ guid ];

      bank = banks[ program.bankId ];

      bank.programs.map((item) => {
        if (guid !== item.guid) {
          otherPrograms.push(item);
        }
      });
    }

    const seo = {
      'title'      : `Купить квартиру в ипотеку от банка ${ bank.name } в ${ getLocationName(currentLocation.id, 'dat').replace(/&nbsp;/gi, ' ') }, покупка квартиры в новостройке в ипотеку от банка ${ bank.name }`,
      'description': `Условия кредитования и процентные ставки по ипотеке от банка ${ bank.name }. Новостройки ${ getLocationName(currentLocation.id, 'dat').replace(/&nbsp;/gi, ' ') }, участвующие в программе «Ипотека» от банка ${ bank.name }`,
      'keywords'   : `квартира в ипотеку от ${ bank.name }`
    };

    return (
      <div className="MortgagePartnersProgramContainer">
        <SeoMeta mortgage={ { ...seo } } />
        <ScrollToTopOnMount scrollEveryUpdate={ true }/>
        <MortgageProgramBanner bank={ bank }
                               program={ program }/>
        <div className="MortgagePartnersProgramContainer-wrapper">
          { !!program.description_formatted && <ConditionsCredit program = { program.description_formatted }
                                                                 contactUrl = { currentLocation.url === '' ? '/moskva-i-oblast' : currentLocation.url }
                                                                 link = { program.bank_url }
                                                                 description = { program.description_full }
                                                                 bankName = { !!bank.abbreviation ? bank.abbreviation : bank.name }/> }
          <div className='MortgagePartnersProgramContainer-container'>
            {!!blocks.length && <ObjectCard items={ blocks } title='Объекты, участвующие в программе'/>}
          </div>
        </div>
        {!!otherPrograms.length && <OthersProgram programs={ otherPrograms }
                                                  region = { currentLocation.url }
                                                  name={ !!bank.abbreviation ? bank.abbreviation : bank.name }
                                                  icon={ bank.icon }/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    mortgage: {
      partners: {
        banks,
        programs
      },
      blocks
    },
    geo: {
      currentLocation
    }
  } = state;

  return { programs, banks, blocks, currentLocation };
}

export default withRouter(connect(mapStateToProps)(MortgagePartnersProgramContainer));