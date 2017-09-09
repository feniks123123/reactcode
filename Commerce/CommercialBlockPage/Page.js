import React, { Component } from 'react';
import { connect } from 'react-redux';
import pageFetchServer from './pageFetchServer';

import Header from '../../components/NonresidentialPage/Header';
import BlockPage from '../../components/NonresidentialPage/BlockPage';

import { getCommerceBulk, actionClearCommerceBlock } from '../../modules/Commercial/actions';
import { actionHideChangeRegion, actionShowChangeRegion } from '../../modules/Geo/actions';

import './styles.less';

const defaultText = 'Помещения находятся на первых этажах зданий, а так же доступны площадки в торговом центре рядом.';

class CommercialBlockPage extends Component {
  static fetchDataOnServer(path, params, myCache) {
    return pageFetchServer(path, params, myCache);
  }

  state = {
    showCity: false
  };

  componentDidMount() {
    const { url } = this.props.match.params;
    const { dispatch } = this.props;
    dispatch(getCommerceBulk(url));
    dispatch(actionHideChangeRegion());

  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(actionClearCommerceBlock());
    dispatch(actionShowChangeRegion());
  }

  render() {
    const { currentCommerce, modalShow, commerceBulks } = this.props;

    if (!currentCommerce) {return null}
    if (!commerceBulks) {return null}

    let showModal = 'showModal';

    if (modalShow) {
      showModal = ` ${ showModal } ${ showModal }--active`;
    }

    let optionsHeader = {
      img: {
        desktop: commerceBulks.new_design.imageParking,
        mobile : commerceBulks.new_design.imageParkingMobile
      },
      title      : commerceBulks.name,
      description: defaultText
    };

    return (
      <div className="CommerceBlockPage">
        <Header { ...optionsHeader }/>
        <BlockPage list={ currentCommerce } infoBlock={ commerceBulks } conditions={ [] } />
        <div className={ showModal }/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CommercialBlockPage);




function mapStateToProps(state) {
  const {
    geo: {
      currentLocation
    },
    commerce: {
      currentCommerce,
      commerceBulks
    },
    modal: {
      show: modalShow
    }
  } = state;

  return {
    currentCommerce,
    commerceBulks,
    currentLocation,
    modalShow
  };
}

