import React, { Component } from 'react';
import { connect } from 'react-redux';
import BankAccordion from '../BankAccordion';

import './styles.less';

class MortgagePartnersContainer extends Component {
  render() {
    const { banks } = this.props;
    const bankKeys = Object.keys(banks);
    bankKeys.sort((key, nextKey) => banks[ key ].min_percent - banks[ nextKey ].min_percent);

    return (
      <div className="MortgagePartnersContainer">
        <div className="MortgagePartnersContainer-wrapper">
          <h2>Партнеры</h2>
        </div>
        <div className="MortgagePartnersContainer-programs">
          <div className="MortgagePartnersContainer-programs-titleWrapper">
            <div className="MortgagePartnersContainer-programs-title">
              <span>Банк</span>
              <div className="MortgagePartnersContainer-programs-titleInside">
                <span>Ставка</span>
                <span>Первоначальный взнос</span>
              </div>
            </div>
          </div>
          { bankKeys.map(key => this.renderAccordion(banks[ key ], key)) }
        </div>
      </div>
    );
  }

  renderAccordion = (item, key) => (
    <BankAccordion key = { key }
                   bank = { { id: key, ...item } }
    />
  );
}

function mapStateToProps(state) {
  const {
   mortgage: {
     partners: {
       banks
     }
   }
  } = state;

  return { banks };
}

export default connect(mapStateToProps)(MortgagePartnersContainer);