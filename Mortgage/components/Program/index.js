import React, { Component } from 'react';
import { connect } from 'react-redux';

import Link from '../../../../components/Link';

import isTablet from '../../../../common/utils/isTablet';
import isMobile from '../../../../common/utils/isMobile';
import './styles.less';

class Program extends Component {

render() {

  let { currentLocation: { url }, item: { name, firstpayment, credittime, min_percent, guid }, bg } = this.props;
  let shortName = name.substr(0, 25);

  if (isMobile()) {
    if (name.length > 25) {
      name = shortName.concat('...');
    }
  }
  return (
    <Link className='Program'
          to={ `${ url }/mortgage/partners/${ guid }` }
          style={ { background: bg } }>
      <div className='Program-column'>
        <div className='Program-description'>Программа</div>
        <div className='Program-text'>{ name }</div>
      </div>
      { !isTablet() &&
      <div className='Program-column'>
        <div className='Program-description'>Первый взнос</div>
        <div className='Program-text'>{ firstpayment }</div>
      </div> }
      { !isTablet() &&
      <div className='Program-column'>
        <div className='Program-description'>Срок</div>
        <div className='Program-text'>{ credittime }</div>
      </div> }
      { !isTablet() &&
      <div className='Program-column'>
        <div className='Program-description'>Ставка</div>
        <div className='Program-text'>{ min_percent }%</div>
      </div> }
      { isTablet() &&
      <div className='Program-column'>
        <div className='Program-description Program-description-payment'>Ставка</div>
        <div className='Program-text Program-text-payment'>{ min_percent }%</div>
      </div> }
    </Link>
  );
}
}

function mapStateToProps(state) {
  const {
    geo: {
      currentLocation
    },
  } = state;

  return { currentLocation };
}

export default connect(mapStateToProps)(Program);