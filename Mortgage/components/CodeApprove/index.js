import React, { Component } from 'react';
import { connect } from 'react-redux';

import Timer from '../../../../components/Timer';

import './styles.less';

import { sendSmsRequest, sendCodeApprove } from '../../../Mortgage/actions';

class CodeApprove extends Component {

  state = {
    codeFocus : false,
    resendCode: false,
    value     : ''
  };

  componentDidMount() {
    this.__input.focus();
  }

  render() {
    const { phone, sms, error } = this.props;
    const { codeFocus, resendCode, value } = this.state;

    let codeErrorCss = 'CodeApprove-error';
    let input = 'CodeApprove-input';

    if (error && typeof error === 'string' && sms !== 'OK') {
      codeErrorCss = `${ codeErrorCss } ${ codeErrorCss }--show`;
    }

    if(codeFocus) {
      input = `${ input } ${ input }--focus`;
    }

    const desc = `На указанный вами номер телефона ${ phone } был отправлен проверочный код. Введите полученный код в поле ниже.`;

    return (
      <div className="CodeApprove">
        <p className="CodeApprove-text">{desc}</p>
        <div className='CodeApprove-wrapper-input'>
          <input className={ input }
                 ref={ c => this.__input = c }
                 name="code"
                 maxLength='4'
                 onFocus={ this.codeFocus }
                 onBlur={ this.codeBlur }
                 value={ value }
                 onChange={ this.handlerCode }/>
        </div>
        <div className='CodeApprove-wrapperCode'>
          <div className={ codeErrorCss }>{ error }</div>
        </div>
        <div className="CodeApprove-timerWrapper">
          {
            resendCode
              ?
              <span onClick={ this.getCodeAgain }>Выслать код повторно</span>
              :
              <span>
                Получить новый код будет возможно через&nbsp;
                <Timer onComplete={ this.onTimerComplete } timer={ 60 }/>
              </span>
          }
        </div>
      </div>
    );
  }

  handlerCode = (event) => {
    const value = event.target.value;

    if(value.length === 4) {
      this.props.dispatch(sendCodeApprove(value));
    }

    this.setState({ value });
  };

  codeFocus = () => {
    this.setState({ codeFocus: true });
  };

  codeBlur = () => {
    this.setState({ codeFocus: false });
  };

  onTimerComplete = () => {
    this.setState({ resendCode: true });
  };

  getCodeAgain = (e) => {
    e.preventDefault();
    this.setState({ resendCode: false });
    this.props.dispatch(sendSmsRequest());
  };


}

function mapStateToProps(state) {
  const { mortgage: { user: { phone }, sms, error } } = state;

  return {
    phone,
    sms,
    error
  };

}

export default connect(mapStateToProps)(CodeApprove);