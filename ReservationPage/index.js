import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import moment from 'moment';
import { canUseDOM } from 'exenv';

import PageLayout from '../../components/PageLayout';
import getFlatsTitle from '../../common/utils/getFlatsTitle';
import separatorPrice from '../../common/utils/separatorPrice';

import './styles.less';

import { setInitObject } from '../../store/mortgage/actions';

class ReservationPage extends Component {

  render(){
    const { data } = this.props;
    if(!data) {return null}

    return(
      <PageLayout title="Бронирование">
        <div className="ReservationPage">
          <div className="ReservationPage-header">
            <h3 className="ReservationPage-header--title">Бронирование</h3>
          </div>
          <div className="ReservationPage-content">
            { data.map((item, i) => this.renderCard(item, i)) }
          </div>
        </div>
      </PageLayout>
    );
  }

  renderCard(item, i){
    return(
      <div className="ReservationPage-card" key={ i }>
        {
          canUseDOM && window.innerWidth < 900 ?
          this.renderMobile(item) :
          this.renderDesktop(item)
        }
      </div>
    );
  }

  renderDesktop(object) {
    const{
      flat: { floor, rooms, area, price },
      booking: { date_start, date_end, status },
      section: { number },
      block,
      bulk,
      layout: { preview }
    } = object;
    let tagStyle = 'ReservationPage-container-top-tag';
    let btn = 'ReservationPage-btn';
    let tagText;
    let nameBtn;

    if (status === 'active') {
      tagText = 'Бронирование активно';
      tagStyle = `${ tagStyle } ${ tagStyle }--active`;
      nameBtn = 'Оставить заявку на ипотеку';
    } else if (status === 'expired') {
      tagText = 'Срок бронирование истек';
      tagStyle = `${ tagStyle } ${ tagStyle }--doneActive`;
      btn = `${ btn } ${ btn }--doneActive`;
    }

    return(
      <div>
        <div className="ReservationPage-card-header">
          <div className="ReservationPage-container-img">
            <img src={ preview } alt="" className="ReservationPage-img"/>
          </div>
          <div className="ReservationPage-container">
            <div className="ReservationPage-container-top">
              <div>
                <h2 className="ReservationPage-container-top-title">{ block.name }</h2>
                <p className="ReservationPage-container-top-text">{ getFlatsTitle(rooms, bulk.type) }</p>
              </div>
              <div>
                <div className={ tagStyle }>{ tagText }</div>
              </div>
            </div>
            <div>
              <ul className="ReservationPage-list">
                <li className="Reservation-item">{ bulk.name }</li>
                <li className="Reservation-item">Секция { number }</li>
                <li className="Reservation-item">Этаж { floor }</li>
                <li className="Reservation-item">{ area } м<sup>2</sup></li>
                <li className="Reservation-item">{ separatorPrice(price) } &#8381;</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ReservationPage-card-footer">
          <div className="ReservationPage-card-left">
            <div>
              <p className="ReservationPage-title">Начало бронирования</p>
              <span className="ReservationPage-data">{ moment(date_start).format('D MMMM YYYY') }</span>
            </div>
            <div>
              <p className="ReservationPage-title">Окончание бронирования</p>
              <span className="ReservationPage-data">{ moment(date_end).format('D MMMM YYYY') }</span>
            </div>
          </div>
          <div className="ReservationPage-card-right">
            <button className={ btn } onClick={ () =>
              this.sendMortgage(object)
            }>{ nameBtn }</button>
          </div>
        </div>
      </div>
    );
  }

  renderMobile(object) {
    const {
      flat: { floor, rooms, area, price },
      booking: { date_start, date_end, status },
      section: { number },
      block,
      bulk,
      layout: { preview }
    } = object;

    let tagStyle = 'ReservationPage-container-top-tag';
    let btn = 'ReservationPage-card-right';
    let tagText;
    let nameBtn;

    if (status === 'active') {
      tagText = 'Бронирование активно';
      tagStyle = `${ tagStyle } ${ tagStyle }--active`;
      nameBtn = 'Оставить заявку на ипотеку';
    } else if (status === 'expired') {
      tagText = 'Срок бронирование истек';
      tagStyle = `${ tagStyle } ${ tagStyle }--doneActive`;
      btn = `${ btn } ${ btn }--doneActive`;
    }
    return(
      <div className="ReservationPage-card-header">
        <div className="ReservationPage-container">
          <img src={ preview } alt="" className="ReservationPage-img"/>
          <div className="ReservationPage-container-top">
            <h2 className="ReservationPage-container-top-title">{ block.name }</h2>
            <p className="ReservationPage-container-top-text">{ getFlatsTitle(rooms, bulk.type) }</p>
            <div className={ tagStyle }>{ tagText }</div>
          </div>
        </div>
        <div className="ReservationPage-list">
          <div className="ReservationPage-item">
            <span>{ bulk.name }</span>
            <span />
          </div>
          <div className="ReservationPage-item">
            <span>Секция</span>
            <span>{ number }</span>
          </div>
          <div className="ReservationPage-item">
            <span>Этаж </span>
            <span>{ floor }</span>
          </div>
          <div className="ReservationPage-item">
            <span>Площадь</span>
            <span>{ area } м<sup>2</sup></span>
          </div>
          <div className="ReservationPage-item">
            <span>Цена</span>
            <span>{ separatorPrice(price) } &#8381;</span>
          </div>
        </div>
        <div className="ReservationPage-card-footer">
          <div className="ReservationPage-card-left">
            <div>
              <p className="ReservationPage-title">Начало бронирования</p>
              <span className="ReservationPage-data">{ moment(date_start).format('D MMMM YYYY') }</span>
            </div>
            <div>
              <p className="ReservationPage-title">Окончание бронирования</p>
              <span className="ReservationPage-data">{ moment(date_end).format('D MMMM YYYY') }</span>
            </div>
          </div>
          <div className={ btn }>
            <button className="ReservationPage-btn" onClick={ () =>
              this.sendMortgage(object)
            }>{ nameBtn }</button>
          </div>
      </div>
      </div>
    );
  }

  sendMortgage(object){
    const { dispatch } = this.props;
    dispatch(setInitObject(object));

    let link = '/mortgage/form?mortgage=params';
    dispatch(push(link));
  }

}

function mapStateToProps(state) {
 const {
   RESERVATION_DATA: { data },
   AUTH_DATA: { token }
 } = state;

 return { data, token };
}

export default connect(mapStateToProps)(ReservationPage);