import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserData from '../UserData';
import CodeApprove from '../CodeApprove';

import './styles.less';

const stepText = [
  { text: 'Личные данные', valueStep: 'USER_DATA' },
  { text: 'ПОДТВЕРЖДЕНИЕ', valueStep: 'CODE_APPROVE' },
  { text: 'АНКЕТА', valueStep: '' }
];

class ApplicationMortgage extends Component{
  render() {
    const { step } = this.props;

    return (
      <div id='ApplicationMortgage' className='ApplicationMortgage'>
        <div className='ApplicationMortgage-container'>
          <h2 className='ApplicationMortgage-title'>Заявка на ипотеку</h2>
          <div className='ApplicationMortgage-step'>
            { stepText.map((item, i) => this.renderStepText(step, item, i)) }
          </div>
          { this.renderStep(step) }
        </div>
      </div>
    );
  }

  renderStepText(step, { text, valueStep }, i) {
    let stepText = 'ApplicationMortgage-step-text';

    if(step === valueStep) {
      stepText = `${ stepText } ${ stepText }--active`;
    }

    return (
      <p className={ stepText } key={ i }>{ text }</p>
    );
  }

  renderStep(step) {
    switch (step) {
      case 'USER_DATA':
        return <UserData/>;
      case 'CODE_APPROVE':
        return <CodeApprove/>;
    }
  }

}

function mapStateToProps(state) {
  const { mortgage: { step } } = state;

  return {
    step
  };

}

export default connect(mapStateToProps)(ApplicationMortgage);