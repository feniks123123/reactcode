import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import InputElement from 'react-input-mask';
import isMobile from './../../common/utils/isMobile';
import { defaultLinks, defaultSocial, defaultCopyright } from './dataFooter.js';

import CheckedForm from 'pik-fw/build/components/Icons/CheckedForm';
import Close from 'pik-fw/build/components/Icons/Close';
import Link from './../../components/Link';

import './styles.less';

class NewFooter extends Component{

  static propTypes = {
    social: PropTypes.arrayOf(
      React.PropTypes.shape({
        url  : React.PropTypes.string,
        title: React.PropTypes.string,
        svg  : React.PropTypes.string
      })
    ),
    links: PropTypes.arrayOf(
      React.PropTypes.shape({
        title     : React.PropTypes.string,
        linksItems: PropTypes.arrayOf(
          React.PropTypes.shape({
            url : React.PropTypes.string,
            text: React.PropTypes.string
          })
        ),
      })
    ),
    copyright: PropTypes.string,
    sendForm : PropTypes.func
  };

  state = {
    callBack  : false,
    phone     : undefined,
    name      : undefined,
    focusPhone: false,
    focusName : false,
    blurPhone : false,
    blurName  : false,
    send      : false
  };

  render () {
    const { translateX } = this.props;

    return (
      <footer className="NewFooter"
              style={ { transform: `translateX(${ translateX })` } }>
        { this.renderFooter() }
      </footer>
    );
  }

  renderFooter(){
    const { social = defaultSocial, links = defaultLinks, copyright = defaultCopyright } = this.props;
    return(
      <div className="NewFooter-contact">
        <div className="NewFooter-container NewFooter-top">
          <div className="NewFooter-contactPhone">
            <div className="NewFooter-container-call">
              <div dangerouslySetInnerHTML={ { __html: '<span class="pik_call_phone_footer_1"><a href="tel:88005000020" class="NewFooter-text NewFooter-phoneLink">8 800 500-00-20</a></span>' } }/>
              {/*<span className="NewFooter-textDesc">Звонок бесплатный</span>*/}
            </div>
            {/*{ this.renderCallBack() }*/}
          </div>
          <div className="NewFooter-contactSocial">
            <div className="NewFooter-textWrapper--social">
              <div>
                <span className="NewFooter-text NewFooter-phoneLink">Задать вопрос</span>
                <span className="NewFooter-textDesc">менеджеру в чате</span>
              </div>
            </div>
            <div className="NewFooter-socialWrapper">

              { social.map((item, i) => this.renderSocial(item, i)) }
            </div>
          </div>
        </div>
        <div className="NewFooter-linksBlock">
          <div className="NewFooter-container">
            <div className="NewFooter-linksWrapper">
              <div className="NewFooter-linksList NewFooter-desktop">
                        <span className="NewFooter-linksTitle">
                          Группа компаний ПИК
                        </span>
                <span className="NewFooter-linksItem NewFooter-linksItem--noHover">
                  Все права на публикуемые на сайте материалы принадлежат ПАО «Группа Компаний ПИК»  © 2000 — 2017</span>
              </div>
              { links.map((item, i) => this.renderLinksBlock(item, i)) }
            </div>
            <div className="NewFooter-info NewFooter-mobile">
              <span className="NewFooter-info-text">
                 <span className="NewFooter-groupPik">© Группа компаний ПИК.</span> Все права на публикуемые на сайте материалы принадлежат ПАО «Группа Компаний ПИК»  © 2000&nbsp;—&nbsp;2017</span>
            </div>
            <div className="NewFooter-copyright" dangerouslySetInnerHTML={ { __html: copyright } } />
          </div>
        </div>
      </div>
    );
  }


  renderSocial({ title, url, icon, className }, i) {
    let socialItem = 'NewFooter-socialItem';
    return (
      <a key={ i } href={ url } className={ socialItem + ' ' + className }>
        <div className="NewFooter-socialItem-icon" dangerouslySetInnerHTML={ { __html: icon } }/>
        <span>{title}</span>
      </a>
    );
  };

  renderLinksBlock({ title, linksItems }, i) {
    return (
      <div key={ i } className="NewFooter-linksList" onClick={
        (e)=>e.currentTarget.classList.toggle('active-link') }>
        <span className="NewFooter-linksTitle">
          { title }
        </span>
        { linksItems.map(({ url, text }, key) => (
          <Link key={ key }
                target="_blank"
                to={ url }
                className="NewFooter-linksItem">{ text }</Link>
        )) }
      </div>
    );
  }

  onFocusPhone() {
    this.setState({ focusPhone: true });
  };

  onBlurPhone() {
    const { phone } = this.state;
    if(phone === '') {
      this.setState({ focusPhone: false });
    } else {
      this.setState({ focusPhone: true });
    }
  };

  onFocusName() {
    this.setState({ focusName: true });
  };

  onBlurName() {
    const { name } = this.state;
    if(name === '') {
      this.setState({ focusName: false });
    } else {
      this.setState({ focusName: true });
    }
  };


  renderCallBack() {
    const { callBack, focusPhone, focusName, phone, name, send } = this.state;
    let phoneInput = 'NewFooter-input phone';
    let nameInput = 'NewFooter-input name';
    let labelPhone = 'NewFooter-label phone-footer';
    let labelName = 'NewFooter-label name-footer';
    let buttonReady = 'NewFooter-popupCallBack--button';
    let readyText = 'NewFooter-ready-text';
    let sendPopupCallBack = 'NewFooter-popupCallBack';
    let textButton = 'Заказать обратный звонок';

    const sent = {
      sentPopupCallBack: () => !send ? `${ sendPopupCallBack }` : `${ sendPopupCallBack } sendPopupCallBack`,
      sentReadyText    : () => !send ? `${ readyText }` : `${ readyText } NewFooter-popupCallBack--close-ready`,
      sentPopup        : () => !send ? {} : { 'display': 'none' },
      sentColor        : () => !send ? '#000' : '#fff'
    };

    const call = {
      buttonActive  : () => !callBack ? 'NewFooter--call-button' : 'NewFooter--call-button button--active',
      modalActive   : () => !callBack ? 'NewFooter-modal' : 'NewFooter-modal modal-active',
      callBackActive: () => !callBack ? {} : { 'opacity': '1', 'visibility': 'visible', 'zIndex': '100' }
    };

    const propsPhone = {
      onFocus: () => this.onFocusPhone(),
      onBlur : () => this.onBlurPhone(),
    };

    const propsName = {
      onFocus: () => this.onFocusName(),
      onBlur : () => this.onBlurName(),
    };

    if(isMobile()){
      textButton = 'Обратный звонок';
    }

    if(focusPhone) {
      phoneInput = `${ phoneInput } input-focus`;
      labelPhone = `${ labelPhone } label-focus`;
    }

    if(focusName) {
      nameInput = `${ nameInput } input-focus`;
      labelName = `${ labelName } label-focus`;
    }

    if(!!name) {
      buttonReady = `${ buttonReady } button-ready`;
    }

    return(
      <div className="NewFooter-container-button">
        <button type="button" className={ call.buttonActive() }
                onClick={ (event)=> {event.stopPropagation();
                  this.setState({ callBack: !this.state.callBack });} }>{textButton}</button>
        <div className={ sent.sentPopupCallBack() } style={ call.callBackActive() }>
          <div className={ sent.sentReadyText() }>
            <div className="checked-form">
              <CheckedForm/>
            </div>
            <h3>Спасибо!</h3>
            <p>Наши менеджеры свяжутся<br/>  с вами в ближайшее время.</p>
          </div>
          <form className="NewFooter-form-popup"
                style={ sent.sentPopup() }
          >
            <h3 className="NewFooter-popupCallBack--title">Обратный звонок</h3>
            <div className="NewFooter-container-input">
              <label >
                <span className={ labelPhone }>Номер телефона</span>
                <InputElement mask='+7\ 999 999-99-99'
                              type="text"
                              value={ phone }
                              { ...propsPhone }
                              className={ phoneInput }
                              onChange={ (e) => this.setState({ phone: e.target.value }) }
                              id="phone-footer"/>
              </label>
            </div>
            <div className="NewFooter-container-input">
              <label >
                <span className={ labelName }>Имя</span>
                <input type="text"
                       { ...propsName }
                       className={ nameInput }
                       value={ name }
                       onChange={ (e) => this.setState({ name: e.target.value }) }
                       id="name-footer"/>
              </label>
            </div>
            <div className="NewFooter-container--button">
              <button type="button"
                      onClick={ (event)=> {event.stopPropagation(); this.setState({ send: true })} }
                      className={ buttonReady }>Прошу перезвонить</button>
            </div>
          </form>
          <div className="NewFooter-popupCallBack--close" onClick={ ()=> { this.setState({ callBack: false })} }>
            <Close color={ sent.sentColor() }/>
          </div>
        </div>
        <div className="NewFooter-mobile">
          <div className={ call.modalActive() }/>
        </div>
      </div>
    );
  }



  handleCallbackSubmit(){
    const { name, phone } = this.state;

    if(!name && !phone) {
      this.setState({ error: 'Нет данных' });
      return;
    }

    if(!!this.props.sendForm){

      this.props.sendForm({ name, phone });
    }
  }
}

function mapStateToProps(state) {
  const { modal: { translateX } } = state;

  return { translateX };
}

export default connect(mapStateToProps)(NewFooter);