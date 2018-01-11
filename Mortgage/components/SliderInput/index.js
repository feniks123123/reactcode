import React, { Component } from 'react';

import getBaneBrowser from '../../../../common/utils/getNameBrowser';

import Slider from 'rc-slider';

import './styles.less';

class SliderInput extends Component {

  state = {
    focus: false,
  };

  render() {
    const { description, rangeInput = false, longSelect = false } = this.props;
    const { focus } = this.state;

    let css = 'SliderInput';

    if (focus) {
      css = `${ css } ${ css }--focus`;
    }

    return (
      <div className={ css }>
        <div className='SliderInput-description'>{description}</div>
        {longSelect ? this.renderLongSelect(longSelect) : this.renderInputSelect()}
        {rangeInput && this.renderRange()}
      </div>
    );
  }

  renderInputSelect() {
    const { inputModificator, value, name, shortSelect = false } = this.props;
    let modificatedValue = value;
    let css = 'SliderInput-input';

    if (getBaneBrowser() === 'Firefox' || getBaneBrowser() === 'Edge' && shortSelect) {
      css = 'SliderInput-input SliderInput-input-firefox';
    }

    if (inputModificator) {
      modificatedValue = inputModificator(value);
    }

    return (
      <div className='SliderInput-container'>
        <input className={ css }
               name={ name }
               ref={ c => this.input = c }
               { ...this.propsInput }
               value={ modificatedValue }/>
        {shortSelect && this.renderShortSelect(shortSelect)}
      </div>
    );

  }

  renderRange() {
    const { focus } = this.state;
    const { max, min, step, value, name } = this.props;
    let rangeContainer = 'SliderInput-container-range';
    let bar = 'SliderInput-bar';

    // let right = 100 - ((value - min) * 100 / (max - min));

    if (focus) {
      rangeContainer = `${ rangeContainer } ${ rangeContainer }--focus`;
      bar = `${ bar } ${ bar }--focus`;
      // if (right >= 98) {
      //   bar = `${ bar } ${ bar }--noBefore`;
      // }
    }

    return (
      <div className={ rangeContainer }>
        <Slider className={ bar }
                min={ min }
                step={ Number(step) }
                max={ max }
                onBeforeChange={ this.beforeChange }
                onAfterChange={ this.afterChange }
                value={ value }
                onChange={ value => this.handlerChange({ target: { name, value: String(value) } }) }
                defaultValue={ value }/>
      </div>
    );
  }

  renderShortSelect(option) {
    const { valueSelect, nameSelect, type } = this.props;
    return (
      <div className='SliderInput-currency'>
        <div className='SliderInput-currency-value'>{valueSelect}</div>
        <select name={ nameSelect }
                value={ type }
                { ...this.propsInput }
                className='SliderInput-select'>
          {option.map((item, i) => <option value={ item.type } key={ i }>{item.text}</option>)}
        </select>
      </div>
    );
  }


  renderLongSelect(option) {
    const { value, name } = this.props;
    return (
      <div className='SliderInput-citizenship'>
        <div className='SliderInput-citizenship-value'>{value}</div>
        <select name={ name }
                value={ value }
                { ...this.propsInput }
                className='SliderInput-citizenship-select'>
          {option.map((item, i) => <option value={ item } key={ i }>{item}</option>)}
        </select>
      </div>
    );
  }

  focus = () => {
    this.setState({ focus: true });
    if (this.props.onFocus) {
      this.props.onFocus(this.props.name);
    }
  };

  beforeChange = () => {
    const { name, value } = this.props;
    this.setState({ focus: true });
    if(this.props.onBeforeChange){
      this.props.onBeforeChange(name, value);
    }
  };

  afterChange = () => {
    const { name, value } = this.props;
    this.setState({ focus: false });
    if(this.props.onAfterChange){
      this.props.onAfterChange(name, value);
    }
  };

  blur = () => {
    const { name, value, min } = this.props;

    this.setState({ focus: false });

    if (this.props.onBlur) {
      this.props.onBlur(name, value, min);
    }
  };

  handlerChange = (event) => {
    const { validator, shortSelect } = this.props;
    const name = event.target.name;
    let value = event.target.value;

    let type = '';
    let currentHading;

    if (!!shortSelect) {
      currentHading = shortSelect.find(handing => value === handing.type);
    }

    if (!!currentHading) {
      type = currentHading.type;
      value = currentHading.text;
    }

    if (!!validator && name !== 'currencySelect') {
      value = validator(value);
    }

    this.props.onChange({ name, value, type });

  };

  propsInput = {
    onFocus : this.focus,
    onChange: this.handlerChange,
    onBlur  : this.blur,
  };
}

export default SliderInput;