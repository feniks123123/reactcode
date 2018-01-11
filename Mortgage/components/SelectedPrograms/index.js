import React, { Component } from 'react';

import isLaptop from '../../../../common/utils/isLaptop';
import isMobile from '../../../../common/utils/isMobile';
import separatorPrice from '../../../../common/utils/separatorPrice';
import Link from '../../../../components/Link';
import Color from 'color';

import './styles.less';

class SelectedPrograms extends Component {

  state = {
    render: false
  };

  // componentDidUpdate({ item: { monthPayment: prevMonthPayment }, count: prevCount }) {
  //   let { item: { monthPayment }, count } = this.props;
  //
  //   if(monthPayment !== prevMonthPayment) {
  //     this.setState({ render: true });
  //   }
  //   // console.log(count);
  //   // console.log(prevCount);
  //
  //   if(count !== prevCount){
  //     // this.setState({ render: true });
  //   }
  // }

  render(){
    let {
      region,
      item: { name, monthPayment, max_period, guid, min_percent },
      bank: { gradient_from, icon_calc, abbreviation, name: bankName },
      focus,
      count
    } = this.props;

    const { render } = this.state;

    let colorFun = Color(gradient_from).hsl();
    let borderColor;
    let color;
    let colorText;
    let shortName = name.substr(0, 20);

    if (colorFun.dark()) {
      borderColor = this.colorBorderDark(colorFun);
      color = this.colorDark(colorFun);
      colorText = 'rgba(255, 255, 255, 1)';
    }

    if (colorFun.light()) {
      borderColor = this.colorBorderLight(colorFun);
      color = this.colorLight(colorFun);
      colorText = '#484848';
    }

    if (borderColor === 'hsl(30, 79%, 44%)' || borderColor === 'hsl(191, 79%, 39%)') {
      borderColor = this.colorBorderDark(colorFun);
      color = this.colorDark(colorFun);
      colorText = 'rgba(255, 255, 255, 1)';
    }

    if (isLaptop()) {
      borderColor = null;
    }

    if (isMobile()) {
      if (name.length > 20) {
        name = shortName.concat('...');
      }
    }

    let css = 'SelectedPrograms';
    let animationDelay;

    if (!focus && !isMobile()) {
      css = `${ css } ${ css }--active flash`;
      animationDelay = `0.${ (count + 1) }s`;
      // setTimeout(() => this.setState({ render: false }), 1000);
    }

    return (<Link to={ `${ region }/mortgage/partners/${ guid }` }
                  className={ css }
                  style={ {
                    background: colorFun,
                    color     : colorText,
                    animationDelay
                  } }>
      <div className='SelectedPrograms-top' style={ { borderColor } }>
        <div className='SelectedPrograms-logo'>
          <span dangerouslySetInnerHTML={ { __html: icon_calc } }/>
        </div>
        <div className='SelectedPrograms-container'>
          <h2 className='SelectedPrograms-title' style={ { color } }>{!!abbreviation ? abbreviation : bankName}</h2>
          <p className='SelectedPrograms-program'>{name}</p>
          {isLaptop() && this.renderPriceMobile(monthPayment, color)}
        </div>
      </div>
      <div className='SelectedPrograms-bottom'>
        <div className='SelectedPrograms-column' style={ { borderColor } }>
          <p className='SelectedPrograms-description'
             style={ { color } }>Ставка</p>
          <p className='SelectedPrograms-text'>{min_percent}%</p>
        </div>
        <div className='SelectedPrograms-column' style={ { borderColor } }>
          <p className='SelectedPrograms-description'
             style={ { color } }>Срок до</p>
          <p className='SelectedPrograms-text'>{max_period} лет</p>
        </div>
        <div className='SelectedPrograms-column'>
          <p className='SelectedPrograms-description'
             style={ { color } }>Платеж в месяц</p>
          <p className='SelectedPrograms-text'>{separatorPrice(monthPayment)} ₽</p>
        </div>
      </div>
    </Link>);
  }
  colorBorderDark = ({ color }) => {
    let brightness = Math.round(color[ 2 ] + 9);
    let saturation = Math.round(color[ 1 ] - 14);
    return `hsl(${ Math.round(color[ 0 ]) }, ${ saturation }%, ${ brightness }%)`;
  };

  colorDark = ({ color }) => {
    let brightness = Math.round(color[ 2 ] + 40);
    let saturation = Math.round(color[ 1 ] - 23);
    return `hsl(${ Math.round(color[ 0 ]) }, ${ saturation }%, ${ brightness }%)`;
  };

  colorBorderLight = ({ color }) => {
    let saturation = Math.round(color[ 1 ] - 21);
    let brightness = Math.round(color[ 2 ] - 6);
    return `hsl(${ Math.round(color[ 0 ]) }, ${ saturation }%, ${ brightness }%)`;
  };

  colorLight = ({ color }) => {
    let saturation = Math.round(color[ 1 ] - 30);
    let brightness = Math.round(color[ 2 ] - 24);
    return `hsl(${ Math.round(color[ 0 ]) }, ${ saturation }%, ${ brightness }%)`;
  };

  renderPriceMobile(price, color){
    return (<p className='SelectedPrograms-price'
               style={ { color } }>от {separatorPrice(price)} ₽ в месяц</p>);
  };

}

export default SelectedPrograms;