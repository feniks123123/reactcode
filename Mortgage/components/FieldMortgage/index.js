import React, { Component } from 'react';
import InputElement from 'react-input-mask';

import { isEmail } from './utils/validator';

import './styles.less';

export default class FieldMortgage extends Component {
  static defaultProps = {
    type          : 'text',
    size          : null,
    name          : '',
    placeholder   : '',
    validators    : [],
    validateOnBlur: false,
    disabled      : false,
    required      : false
  };

  state = {
    errorMessage: '',
    focus       : false,
    value       : this.props.value,
    isValid     : false
  };

  validators = [];

  validateOnBlur = false;

  componentDidMount() {
    const { required, type } = this.props;

    if(required) {
      this.validators.push(
        {
          message  : 'Поле обязательно для заполнения',
          validator: value => !!value.length
        }
      );
    }

    if(type === 'email') {
      this.validators.push(
        {
          message  : 'Эл. почта должна быть формата example@example.ru',
          validator: value => isEmail(value)
        }
      );
    }

    if(required || type === 'email') {
      this.validateOnBlur = true;
    }
  }

  componentDidUpdate() {
    this.checkValue();
  }

  checkValue() {
    if (this.state.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange(e) {
    const { limit } = this.props;
    let value = e.target.value;

    if (!!limit && value.length > limit) {
      return;
    }

    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(value, this.props.name);
    }

    if (this.validateOnBlur) {
      return;
    }

    if (!this.props.validateOnBlur) {
      this.validate(value);
    }
  }

  onBlur(e) {
    const value = e.target.value;

    this.setState({ focus: false });

    if (this.props.validateOnBlur || this.validateOnBlur) {
      this.validate(value);
    }

    if (this.props.onBlur) {
      this.props.onBlur(e, this.props.name);
    }
  }

  onFocus(e) {
    this.setState({ focus: true });

    if (this.props.onFocus) {
      this.prop.onFocus(e, this.props.name);
    }
  }

  validate(value) {

    const validators = !!this.props.validators.length ? [ ...this.validators, ...this.props.validators ] : this.validators;

    const errors = validators.filter((v) => {
      return v.validator && !v.validator(value);
    });

    const err = !!errors.length ? errors[ 0 ] : null;

    const newState = err
      ? { isValid: false, errorMessage: !!this.props.propsError ? this.props.propsError : err.message }
      : { isValid: true, errorMessage: null };

    let code = null;

    if (!!err) {
      code = err.code;
    }

    this.setState(newState, () => {
      if (this.props.afterValidate) {
        this.props.afterValidate(this.state.isValid, this.props.name, code);
      }
    });
  }

  render() {
    const { isValid, value, focus, errorMessage } = this.state;
    let { placeholder } = this.props;
    let css = `FieldMortgage`;

    const { name, successMessage, propsError, icon, required } = this.props;

    if (focus) {
      css = `${ css } FieldMortgage-focus`;
    }

    if (!focus && !!value) {
      css = `${ css } FieldMortgage-hasValue`;
    }

    if (!!required) {
      placeholder = `${ placeholder } *`;
    }

    return (
      <label className={ css }
             htmlFor={ name }>
        { this.renderInput() }
        <div className="FieldMortgage-wrapper">
          <span className="FieldMortgage-placeholder">{ placeholder }</span>
        </div>
        { isValid ?
          <span
            className="FieldMortgage-message FieldMortgage-message--success"
          >
            { successMessage }
          </span>
          :
          <span
            className="FieldMortgage-message FieldMortgage-message--error"
          >
            { propsError || errorMessage }
          </span>
        }
        { !!icon ? <div className="FieldMortgage-icon">{ icon }</div> : null }
      </label>
    );
  }

  renderInput() {
    let { value } = this.state;
    const { name, type, disabled, size, mask, valueView } = this.props;

    if(!!valueView) {
      value = valueView(value);
    }

    const props = {
      disabled,
      size,
      name,
      value,
      id       : name,
      type     : type === 'password' ? 'password' : null,
      className: 'FieldMortgage-input',
      onChange : (e) => this.onChange(e),
      onBlur   : (e) => this.onBlur(e),
      onFocus  : (e) => this.onFocus(e),
    };

    if(!!mask) {
      return (
        <InputElement { ...props } mask={ mask } maskChar={ null }/>
      );
    }

    return (<input { ...props }/>);
  };
}