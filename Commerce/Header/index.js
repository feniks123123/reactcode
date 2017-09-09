import React, { Component } from 'react';
import { connect } from 'react-redux';

import isTablet from '../../../common/utils/isTablet';

import './styles.less';

class Header extends Component {
  render() {
    const { translateX, modalShow, title, img, description } = this.props;

    return (
      <div className="Header"
           style={ modalShow ? { transform: `translateX(${ translateX })` } : null }>
        { !isTablet() ? <img src = { img.desktop }/> : <img src={ img.mobile } alt=""/> }
        <div className="Header-content">
          <div className="Header-content--fixed">
          <div className="Header-image-titleWrapper">
            <h2>{ title }</h2>
            <p className='Header-image-titleWrapper-text'
               dangerouslySetInnerHTML={ { __html: description } }/>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { modal: { translateX, show: modalShow } } = state;

  return { translateX, modalShow };
}

export default connect(mapStateToProps)(Header);