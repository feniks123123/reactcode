import React, { Component } from 'react';
import Link from 'pik-fw/build/components/Link';
import { canUseDOM } from 'exenv';
import { connect } from 'react-redux';

import './styles.less';

import {
  dealPageConnect
} from '../../../store/statusDeal/actions';

const statusList = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'
];

class StatusDealPage extends Component {

  static defaultProps = {
    deals: []
  };

  state = {
    windowWarning: false,
    url          : '',
    flatId       : this.props.params.flatId,
  };

  componentDidMount() {
    const { user } = this.props;
    if (!!user) {
      this.getPageData();
    }
  }

  componentDidUpdate() {
    const { user, data } = this.props;
    if (!!user && !data) {
      this.getPageData();
    }
  }

  getPageData() {
    const { flatId = '' } = this.state;
    const { dispatch, token, deals, user } = this.props;
    let opportunities = null;
    let id;

    deals.forEach(function (item) {
      if (flatId === item.guid.toLowerCase()) {
        id = item.id;
      }
    });

    if (!!token && !!id) {
      dispatch(dealPageConnect(token, id));
    }
  }

  render() {
    const { windowWarning, url } = this.state;
    const { data } = this.props;

    let StatusDealPageWindowWarning = 'StatusDealPage-windowWarning';
    let link;
    let test;

    if(!data) return null;

    if (data.warn === 'WARN_EMPTY_OPPORTUNITY_LOG' || Array.isArray(data) && !data.length) {
      return (
        <div className="noItems">
          <span> Нет информации </span>
        </div>
      );
    }

    data.forEach(function (item, i) {
      if (item.date !== '') {
        return test = i;
      }
    });

    data.forEach(function (item, i) {
      if (test > i) {
        item.active = true;
      }
    });

    if (!!url) {
      link = url;
    }

    if (windowWarning) {
      StatusDealPageWindowWarning = `
      ${ StatusDealPageWindowWarning } 
      ${ StatusDealPageWindowWarning }--active`;
    }

    return (
      <div className="StatusDealPage">
        <h2 className="StatusDealPage-title">Ход сделки</h2>
        <div className="StatusDealPage-container">
          <div className="StatusDealPage-listStatus StatusDealPage-des">
            <div className="StatusDealPage-column">
              <div className="StatusDealPage-text">Шаг</div>
            </div>
            <div className="StatusDealPage-column">
              <div className="StatusDealPage-text">Дата</div>
            </div>
            <div className="StatusDealPage-column">
              <div className="StatusDealPage-text">Статус</div>
            </div>
            <div className="StatusDealPage-column"/>
          </div>
          <div>
            { data.map((item, i) => this.renderList(item)) }
          </div>
        </div>
        <div className={ StatusDealPageWindowWarning }>
          <div className="StatusDealPage-window">
            <h2 className="StatusDealPage-window-title">Отправка документов на проверку в ЦО</h2>
            <p className="StatusDealPage-window-text">В ходе проверки документов были обнаружены ошибки.
              <br/> В ближайшее время с вами свяжется менеджер для учтонения деталей</p>
            <Link to={ link } className="StatusDealPage-window-button">Посмотреть ошибки</Link>
            <div className="StatusDealPage-window--close"
                 onClick={ () => this.setState({ windowWarning: false }) }/>
          </div>
        </div>
      </div>
    );
  }


  renderList({ steps, steps_id, date, status, status_id, name, url, active }) {
    let StatusDealPageList = 'StatusDealPage-list';
    let StatusDealPageSigned = 'StatusDealPage-signed';

    let StatusDealPageCircle = 'StatusDealPage-circle';
    let StatusDealPageActive = 'StatusDealPage-circle--active';
    let StatusDealPageNextSteps = 'StatusDealPage-circle-nextSteps';
    let StatusDealProcessing = 'StatusDealPage-circle--processing';
    let StatusDealWarning = 'StatusDealPage-circle--warning';

    if(!statusList.some(item => item === status_id)) {
      return null;
    }

    if (status_id === '') {
      StatusDealPageList = `${ StatusDealPageList } ${ StatusDealPageSigned }`;
      status = 'Ожидается';
    }

    if (date === '') {
      date = 'Не назначена';
    }

    if (status_id === '12') {
      StatusDealPageList = `${ StatusDealPageList } ${ StatusDealPageSigned }`;
    }

    if (status_id === '1'
      || status_id === '5'
      || status_id === '9'
      || status_id === '11'
      || status_id === '7') {
      StatusDealPageCircle = `
      ${ StatusDealPageCircle }
      ${ StatusDealPageActive }
      ${ StatusDealPageNextSteps }`;
    }

    if (status_id === '2'
      || status_id === '4'
      || status_id === '6'
      || status_id === '8'
      || status_id === '10') {
      StatusDealPageCircle = `
        ${ StatusDealPageCircle }
        ${ StatusDealProcessing }
        ${ StatusDealPageNextSteps }
      `;
    }

    if (status_id === '3') {
      StatusDealPageCircle = `
        ${ StatusDealPageCircle }
        ${ StatusDealWarning }
        ${ StatusDealPageNextSteps }
      `;
    }

    if (status_id === '13') {
      StatusDealPageCircle = `
        ${ StatusDealPageCircle }
        ${ StatusDealProcessing }
        ${ StatusDealPageNextSteps }
      `;
      status = 'Нет данных';
    }

    return (
      <div className={ StatusDealPageList + ' ' + StatusDealPageCircle } key={ steps_id }>
        <div className="StatusDealPage-column">
          <div className="StatusDealPage-steps">{ steps }</div>
        </div>
        { canUseDOM && window.innerWidth < 900 ? this.renderMobile(date, status) : ''}
        <div className="StatusDealPage-column">
          <div className="StatusDealPage-text StatusDealPage-mob">Дата</div>
          <div className="StatusDealPage-date">{ date }</div>
        </div>
        <div className="StatusDealPage-column">
          <div className="StatusDealPage-text StatusDealPage-mob">Статус</div>
          <div className="StatusDealPage-status">{ status }</div>
        </div>
        <div className="StatusDealPage-column">
          <div className="StatusDealPage-container-button">
            { status === 'Документы не прошли проверку' ?
              <button className="StatusDealPage-btn" onClick={
                () => {
                  this.setState({ windowWarning: true });
                  this.setState({ url });
                } }>{ name }
              </button>
              :
              <button className="StatusDealPage-btn">{ name }</button>
            }
          </div>
        </div>
      </div>
    );
  }

  renderMobile(date, status) {
    return (
      <div className="StatusDealPage-mobileColumn">
        <div className="StatusDealPage-column">
          <div className="StatusDealPage-text StatusDealPage-mob">Дата</div>
          <div className="StatusDealPage-date">{ date }</div>
        </div>
        <div className="StatusDealPage-column">
          <div className="StatusDealPage-text StatusDealPage-mob">Статус</div>
          <div className="StatusDealPage-status">{ status }</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    AUTH_DATA: { token },
    STATUS_DEAL_DATA: { data },
    USER_DATA: { deals, user }
  } = state;

  return {
    token,
    data,
    deals,
    user
  };
}

export default connect(mapStateToProps)(StatusDealPage);