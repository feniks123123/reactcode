import React, { PropTypes, Component } from 'react';
import isMobile from '../../../common/utils/isMobile';
import { showPopup } from '../../../modules/Popup/actions';
import { connect } from 'react-redux';

import './styles.less';

class PopupDropDown extends Component {

  static defaultProps = {
    dispatch: ()=>{}
  };

  getRoomsCost(min_price) {
    let division = (min_price * 10) / 10000000;
    return Number(division).toFixed(2).replace('.', ',');
  };

  getCostPerMeter(min_price) {
    return (min_price * 10) / 10000;
  };

  render() {
    const { dispatch, id, type } = this.props;

    const { flat, bulk, floor, section } = this.props.place;

    let preview;
    let price;

    if(!!flat && !!flat.layout) {
      preview = flat.layout.preview;
      price = this.getRoomsCost(flat.price);
    } else {
      preview = floor.plans;
      price = floor.price;
    }

    return(
      <div className="PopupDropDown-wrapper"
           id = { id }>
        <div className="PopupDropDown-bulkWrapper"
             onClick={ () => { !!preview ? dispatch(showPopup(id)) : null } }>
          { isMobile() ?
            <div className= 'PopupDropDown-description'>
              <div className="PopupDropDown-descriptionWrapper">
                <div className="PopupDropDown-bulk">
                  { bulk.name }
                </div>
                <div className="PopupDropDown-sectionWrapper">
                  <div className="PopupDropDown-section">
                    { section.name }
                  </div>
                  <div className="PopupDropDown-section">
                    Уровень { floor.level }
                  </div>
                </div>
              </div>
              <div className="PopupDropDown-priceWrapper">
                <div className="PopupDropDown-price">
                  { type === 'parking' ? `${ price } ₽` : `${ price } млн ₽` }
                </div>
                <div className={ !!preview ?
                  'PopupDropDown-arrow'
                  : 'PopupDropDown-arrow PopupDropDown-arrow--hide' }>
                  <svg width="11" height="7" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.393.468l-4.92 4.92L.564.477" strokeWidth="1.123" stroke="#7A7A7A" fill="none" fillRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            :
            <div className= 'PopupDropDown-description'>
                <div className="PopupDropDown-bulk">
                  { bulk.name }
                </div>
                  <div className="PopupDropDown-section">
                    { section.name }
                  </div>
                  <div className="PopupDropDown-section">
                    Уровень { floor.level }
                  </div>
                  { !!flat ?
                    <div className="PopupDropDown-price">
                    { flat.area_bti } м<sup>2</sup>
                    </div> :
                    null }
                  <div className="PopupDropDown-price">
                    { type === 'parking' ? `${ price } ₽` : `${ price } млн ₽` }
                  </div>
                  { !!flat ?
                    <div className="PopupDropDown-price">
                      { this.getCostPerMeter(flat.price_meter) } тыс ₽/м<sup>2</sup>
                    </div>
                    : null }
                <div className={ !!preview ?
                  'PopupDropDown-arrow' :
                  'PopupDropDown-arrow PopupDropDown-arrow--hide' }>
                  <svg width="11" height="7" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.393.468l-4.92 4.92L.564.477" strokeWidth="1.123" stroke="#7A7A7A" fill="none" fillRule="evenodd"/>
                  </svg>
                </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default connect()(PopupDropDown);