import React, { Component } from 'react';
import { connect } from 'react-redux';

import clientRendering from '../../../../common/utils/clientRendering';
import separatorPrice from '../../../../common/utils/separatorPrice';
import Close from '../IconFilter/close';

class ValueInput extends Component {

  state = {
    placeholderFrom  : 'от',
    placeholderBefore: 'до',
    fromValue        : '',
    beforeValue      : '',
    focusFrom        : false,
    focusBefore      : false
  };

  propsInput = {
    onFocus : (event) => this.focusInput(event),
    onBlur  : (event) => this.blurInput(event),
    onChange: (event) => this.handlerChange(event)
  };


  render() {
    const {
      placeholderFrom,
      fromValue,
      beforeValue,
      focusFrom,
      focusBefore,
      placeholderBefore
    } = this.state;

    let short = 'ComplexesFilter-short';
    let shortBefore = 'ComplexesFilter-short-before';
    let input = 'ComplexesFilter-short-input';
    let display = 'block';

    if (focusFrom) {
      short = `${ short } ${ short }-border`;
      input = `${ input } ${ input }-focus`;
    }

    if (focusBefore) {
      shortBefore = `${ shortBefore } ${ shortBefore }-border`;
      input = `${ input } ${ input }-focus`;
    }


    return(
      <span className='ComplexesFilter-short-container'>
        <div className={ short }>
          <span style={ { display } }
              className="ComplexesFilter-description ComplexesFilter-short-description">Стоимость</span>
          <input type="text"
                 { ...this.propsInput }
                 className={ input }
                 value={ fromValue }
                 name='from'
                 placeholder={ placeholderFrom }/>
        </div>
        <div className={ 'ComplexesFilter-short ' + shortBefore }>
          <input type="text"
                 { ...this.propsInput }
                 value={ beforeValue }
                 name='before'
                 className='ComplexesFilter-short-input ComplexesFilter-short-input-border'
                 placeholder={ placeholderBefore }/>
          <span className="ComplexesFilter-close"
                onClick={ () => this.clearInput() }>
            { !!fromValue || !!beforeValue ? <Close/> : null }
          </span>
        </div>
      </span>
    );
  }

  focusInput(event){
    let name = event.target.name;
    if (name === 'from') {
      this.setState({
        placeholderFrom: '1 800 000',
        fromValue      : '',
        focusFrom      : true
      });
    } else if (name === 'before') {
      this.setState({
        placeholderBefore: '106 000 000',
        beforeValue      : '',
        focusBefore      : true
      });
    }
  }

  clearInput() {
    this.setState({
      placeholderFrom  : 'от',
      placeholderBefore: 'до',
      fromValue        : '',
      beforeValue      : ''
    });
  }

  blurInput(event){
    let name = event.target.name;
    const { fromValue, beforeValue } = this.state;
    if (name === 'from') {
      if(!!fromValue.length) {
        return this.setState({
          fromValue: `${ this.separator(fromValue) } млн`,
          focusFrom: false
        });
      }
      this.setState({
        placeholderFrom: 'от',
        focusFrom      : false
      });
    } else if (name === 'before') {
      if(!!beforeValue.length) {
        return this.setState({
          beforeValue: `${ this.separator(beforeValue) } млн`,
          focusBefore: false
        });
      }
      this.setState({
        placeholderBefore: 'до',
        focusBefore      : false
      });
    }
  }

  handlerChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    event.preventDefault();
    value = value.replace(/\s/g, '');

    if (/\D/.test(value)) {
      return;
    }

    if (clientRendering) {
      if (Number(String(value).length) > 9) {
        return;
      }
    }

    this.setState({ [ `${ name }Value` ]: separatorPrice(value) });
  };

  separator(valueInput){
    let division;
    let value = valueInput.replace(/\s/g, '');
    if(value.length <= 8) {
      division = (value * 10) / 10000000;
      return Number(division).toFixed(1).replace('.', ',');
    } else if (value.length > 8) {
      division = (value * 10) / 10000000;
      return Number(division).toFixed(1).replace('.', ',');
    }
  }
}


function mapStateToProps(state) {
  const {
    filter: { valueInput }
  } = state;

  return {
    valueInput
  };
}

export default connect(mapStateToProps)(ValueInput);