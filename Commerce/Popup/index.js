import React, { PropTypes, Component } from 'react';
import { hidePopup } from '../../../modules/Popup/actions';
import isMobile from '../../../common/utils/isMobile';
import { withRouter } from 'react-router-dom';
import CarouselDefault from 'pik-fw/build/components/CarouselDefault';
import { connect } from 'react-redux';

import './styles.less';

const close = (
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#333" fill="none" fillRule="evenodd" opacity=".4">
      <rect x=".5" y=".5" width="39" height="39" rx="19.5"/>
      <g strokeLinecap="square">
        <path d="M16.446 15.822l8.744 8.745M16.446 24.178l8.744-8.745"/>
      </g>
    </g>
  </svg>);

class Popup extends Component {

  state = {
    slideNumber: 0
  };

  static defaultProps = {
    dispatch: ()=>{}
  };

  render() {
    const { PopUp, slide, dispatch, currentId } = this.props;
    const { slideNumber } = this.state;

    let carouselCss = 'Popup-carousel';

    let sliderArray = [];

    slide.map((item) => {
      if(!!item.flat && !!item.flat.layout.preview) {
        return sliderArray.push(item);
      }
      if(!!item.floor.plans) {
        return sliderArray.push(item);
      }
    });

    if(slideNumber === 0) {
      carouselCss = `${ carouselCss } Popup-carousel--hideFirst`;
    }

    if(slideNumber + 1 === sliderArray.length) {
      carouselCss = `${ carouselCss } Popup-carousel--hideLast`;
    }

    // console.log(slide.flat);
    //
    // if (!slide.flat && !slide.flat.layout.preview) {
    //   sliderArray.push(slide);
    // }
    //
    // console.log(sliderArray);


    return(
      <div className={ PopUp ? 'Popup-popupWrapper' : 'Popup-popupWrapper Popup-popupWrapper-hide' }>
        <div className="Popup-popup" id="Popup">
          <CarouselDefault
            className={ carouselCss }
            afterSlide={ (number) => this.setState({ slideNumber: number }) }
            slideWidth={ 1 }
            dragging={ false }
            slideIndex = { currentId }
            edgeEasing="linear"
          >
            { sliderArray.map((item) => {
              return (
                <div className="PopupDropDown-popup-wrapper">
                  { isMobile() ?
                    <div className="PopupDropDown-bulkName">
                      { this.props.name }
                    </div> : null }
                    <div className="PopupDropDown-title-description">
                      <div className="PopupDropDown-title-description-inside">
                        { !isMobile() ?
                          <div className="PopupDropDown-bulkName">
                            { this.props.name }
                          </div> : null }
                        <div className="PopupDropDown-section">
                          { item.bulk.name }
                        </div>
                        <div className="PopupDropDown-section">
                          { item.section.name }
                        </div>
                        <div className="PopupDropDown-section">
                          Уровень { item.floor.level }
                        </div>
                      </div>
                      <button onClick={ id => dispatch(hidePopup(id)) }>{ close }</button>
                    </div>
                    <div className="PopupDropDown-popup-image">
                      <img src = { !!item.flat && !!item.flat.layout.preview ? item.flat.layout.preview : item.floor.plans }/>
                    </div>
                </div>
              );
              }) }
          </CarouselDefault>
        </div>
      </div>
    );
  }
 }

function mapStateToProps(state) {
  const {
    popup: { PopUp, currentId },
  } = state;

  return { PopUp, currentId };
}

export default withRouter(connect(mapStateToProps)(Popup));