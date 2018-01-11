import React, { Component } from 'react';
import { connect } from 'react-redux';

import FieldMortgage from '../FieldMortgage';

import './styles.less';

import {
  actionMortgageStep,
  actionMortgageAddUserData,
  sendSmsRequest
} from '../../../Mortgage/actions';

const CODE_APPROVE = 'CODE_APPROVE';

class UserData extends Component {

  state = {
    user: {
      full_name: '',
      phone    : '',
      birthday : '',
      email    : '',
      passport : ''
    },
    validate: {
      full_name: false,
      phone    : false,
      birthday : false,
      email    : false,
      passport : false,
      agreement: false
    }
  };

  render() {
    const { user, validate: { full_name, phone, birthday, email, passport } } = this.state;

    let buttonCss = 'UserData-button';

    if (!full_name || !phone || !birthday || !email || !passport) {
      buttonCss = `${ buttonCss } ${ buttonCss }--disable`;
    }

    const fioValidate = [
      {
        message  : 'Некорректно введено ФИО',
        validator: value => {
          const re = /[\wа-яА-Я]+\s+[\wа-яА-Я]+\s+[\wа-яА-Я]+/;
          const valid = re.test(value) && value.length > 0;
          this.setState({ validate: { ...this.state.validate, full_name: valid } });
          return valid;
        }
      }
    ];

    const telValidate = [
      {
        message  : 'Неправильный формат телефона',
        validator: value => {
          const re = /^\+7\s\d{3}\s\d{3}\-\d{2}\-\d{2}$/;
          const valid = re.test(value) && value.length > 0;
          this.setState({ validate: { ...this.state.validate, phone: valid } });
          return valid;
        }
      }
    ];

    const bdayValidate = [
      {
        message  : 'Некорректная дата',
        validator: value => {
          const re = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
          const valid = re.test(value) && value.length > 0;
          this.setState({ validate: { ...this.state.validate, birthday: valid } });
          return valid;
        }
      }
    ];

    const emailValidate = [
      {
        message  : 'Ошибка в адресе эл. почты',
        validator: value => {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const valid = re.test(value) && value.length > 0;
          this.setState({ validate: { ...this.state.validate, email: valid } });
          return valid;
        }
      }
    ];

    const passportValidate = [
      {
        message  : 'Ошибка формата данных паспорта',
        validator: value => {
          const re = /^\d{4}\-\d{6}$/;
          const valid = re.test(value) && value.length > 0;
          this.setState({ validate: { ...this.state.validate, passport: valid } });
          return valid;
        }
      }
    ];

    return (
      <div className="UserData">
        <div className='UserData-container'>
          <div className='UserData-oneInput'>
            <FieldMortgage type="text"
                       name="full_name"
                       placeholder="Фамилия Имя и Отчество"
                       value={ user.full_name }
                       validators={ fioValidate }
                       onChange={ this.handleChange }
                       onBlur={ this.handleBlur }
            />
          </div>
          <div className='UserData-twoInput'>
            <FieldMortgage type="text"
                       name="phone"
                       mask='+7\ 999 999-99-99'
                       placeholder="Мобильный телефон"
                       value={ user.phone }
                       validators={ user.phone.length > 3 && telValidate }
                       onChange={ this.handleChange }
                       onBlur={ this.handleBlur }
            />
            <FieldMortgage type="text"
                       name="birthday"
                       mask='99.99.9999'
                       placeholder="Дата рождения"
                       validators={ bdayValidate }
                       value={ user.birthday }
                       onChange={ this.handleChange }
                       onBlur={ this.handleBlur }
            />
          </div>
          <div className='UserData-twoInput'>
            <FieldMortgage type="text"
                       name="email"
                       placeholder="Адрес эл. почты"
                       validators={ emailValidate }
                       value={ user.email }
                       onChange={ this.handleChange }
                       onBlur={ this.handleBlur }
            />
            <FieldMortgage type="text"
                       name="passport"
                       mask="9999-999999"
                       validators={ passportValidate }
                       placeholder="Серия и номер паспорта"
                       value={ user.passport }
                       onChange={ this.handleChange }
                       onBlur={ this.handleBlur }
            />
          </div>
          <div className='UserData-twoInput'>
            <div className="UserData-disclaimer">
              Заполнение анкеты производится в личном кабинете pik.ru. Если пользователь с указанными данными не найден в системе, то после подтверждения вами номера телефона для вас будет создана учетная запись на сайте pik.ru. Нажимая кнопку «Далее» вы подтверждаете, что согласны с
              условиями <a href="/agreement" target='_blank'>Согласия</a> на обработку персональных данных.
            </div>
            <button className={ buttonCss } onClick={ this.handleUserData }>Далее</button>
          </div>
        </div>
      </div>
    );
  }

  handleChange = (val, name) => {
    this.setState({ user: {
      ...this.state.user,
      [ name ]: val
    } });
  };

  handleBlur = () => this.props.dispatch(actionMortgageAddUserData(this.state.user));

  handleUserData = () => {
    const { validate: { full_name, phone, birthday, email, passport } } = this.state;
    if (!full_name || !phone || !birthday || !email || !passport) {return}
    this.props.dispatch(actionMortgageStep(CODE_APPROVE));
    this.props.dispatch(sendSmsRequest());
  }
}

export default connect()(UserData);