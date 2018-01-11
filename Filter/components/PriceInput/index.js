import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import clientRendering from '../../../../common/utils/clientRendering';
import separatorPrice from '../../../../common/utils/separatorPrice';
import Close from '../icons/close';
import { updateValueWithComplexes, updateFilteredComplexes } from '../../actions';
import isMobile from '../../../../common/utils/isMobile';

class PriceInput extends Component {

  state = {
    placeholderFrom: 'от',
    placeholderTo  : 'до',
    priceFrom      : '',
    priceTo        : '',
    focusFrom      : false,
    focusTo        : false
  };


  componentDidUpdate({ priceFrom: prevPriceFrom, priceTo: prevPriceTo }) {
    const { priceFrom, priceTo } = this.props;
    if(!priceFrom && priceFrom !== prevPriceFrom) {
      this.setState({ priceFrom: '', placeholderFrom: 'от' });
    }
    if(!priceTo && priceTo !== prevPriceTo) {
      this.setState({ priceTo: '', placeholderTo: 'до' });
    }
  }

  updateFilterValue = isMobile() ? updateFilteredComplexes : updateValueWithComplexes;

  render() {
    return(
      <span className='Filter-short-container'>
        { this.renderInputFrom() }
        { this.renderInputTo() }
      </span>
    );
  }

  propsInput = {
    onFocus : (event) => this.focusInput(event),
    onBlur  : (event) => this.blurInput(event),
    onChange: (event) => this.handlerChange(event)
  };

  renderInputFrom() {
    const {
      placeholderFrom,
      priceFrom,
      focusFrom,
    } = this.state;

    let css = 'Filter-short';
    let shortBorder = 'Filter-short-border';

    if (focusFrom) {
      css = `${ css } ${ css }--focus`;
      shortBorder = `${ shortBorder } ${ shortBorder }-focus`;
    }

    return (
      <div className={ css }>
          <span className="Filter-description Filter-short-description">
            Стоимость
          </span>
        <input type="tel"
               { ...this.propsInput }
               value={ priceFrom }
               name='priceFrom'
               className='Filter-short-input'
               placeholder={ placeholderFrom }/>
        <span className={ shortBorder }/>
        { isMobile() ? <span className="Filter-close"
              onClick={ () => this.clearInputFrom() }>
            { !!priceFrom ? <Close/> : null }
        </span> : null }
      </div>
    );
  }

  renderInputTo() {
    const {
      priceFrom,
      priceTo,
      focusTo,
      placeholderTo
    } = this.state;

    let shortBorder = 'Filter-short-border';
    let css = 'Filter-short';

    if (focusTo) {
      css = `${ css } ${ css }--focus`;
      shortBorder = `${ shortBorder } ${ shortBorder }-focus`;
    }

    return (
      <div className={ css }>
        <input type="tel"
               { ...this.propsInput }
               value={ priceTo }
               name='priceTo'
               className='Filter-short-input Filter-short-input-border'
               placeholder={ placeholderTo }/>
        <span className={ shortBorder }/>
        { isMobile() ?
          <span className="Filter-close"
              onClick={ () => this.clearInputTo() }>
            { !!priceTo ? <Close/> : null }
          </span> :
          <span className="Filter-close"
                onClick={ () => this.clearInput() }>
          { !!priceFrom || !!priceTo ? <Close/> : null }
          </span>
        }
      </div>
    );
  }

  focusInput(event){
    let name = event.target.name;
    if(!isMobile()) {
      if (name === 'priceFrom') {
        this.props.dispatch(this.updateFilterValue({ priceFrom: undefined }));
        this.setState({
          placeholderFrom: '1 800 000',
          priceFrom      : '',
          focusFrom      : true
        });
      } else if (name === 'priceTo') {
        this.props.dispatch(this.updateFilterValue({ priceTo: undefined }));
        this.setState({
          placeholderTo: '106 000 000',
          priceTo      : '',
          focusTo      : true
        });
      }
    } else {
      if (name === 'priceFrom') {
        this.props.dispatch(this.updateFilterValue({ priceFrom: undefined }));
        this.setState({
          priceFrom: '',
          focusFrom: true
        });
      } else if (name === 'priceTo') {
        this.props.dispatch(this.updateFilterValue({ priceTo: undefined }));
        this.setState({
          priceTo: '',
          focusTo: true
        });
      }
    }
  }

  clearInput() {
    this.setState({
      placeholderFrom: 'от',
      placeholderTo  : 'до',
      priceFrom      : '',
      priceTo        : ''
    });

    this.props.dispatch(this.updateFilterValue({ priceFrom: undefined, priceTo: undefined }));
  }

  clearInputFrom() {
    this.setState({
      placeholderFrom: 'от',
      priceFrom      : '',
    });

    this.props.dispatch(this.updateFilterValue({ priceFrom: undefined }));
  }

  clearInputTo() {
    this.setState({
      placeholderTo: 'до',
      priceTo      : '',
    });

    this.props.dispatch(this.updateFilterValue({ priceTo: undefined }));
  }

  blurInput(event){
    let name = event.target.name;
    const { priceFrom, priceTo } = this.state;
    if (name === 'priceFrom') {
      if(!!priceFrom.length && isMobile()){
        return this.setState({
          priceFrom: `${ this.separator(priceFrom) } млн`,
          focusFrom: true
        });
      }
      if(!!priceFrom.length) {
        return this.setState({
          priceFrom: `${ this.separator(priceFrom) } млн`,
          focusFrom: false
        });
      }
      this.setState({
        placeholderFrom: 'от',
        focusFrom      : false
      });
    } else if (name === 'priceTo') {
      if(!!priceTo.length) {
        return this.setState({
          priceTo: `${ this.separator(priceTo) } млн`,
          focusTo: false
        });
      }
      this.setState({
        placeholderTo: 'до',
        focusTo      : false
      });
    }
  }

  handlerChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    event.preventDefault();
    value = value.replace(/\s/g, '');

    if (/\D/.test(value)) {
      return;
    }

    if (clientRendering) {
      if (Number(String(value).length) > 9) {
        return;
      }
    }

    this.debounceUpdate(name, value);
    this.setState({ [ name ]: separatorPrice(value) });
  };

  debounceUpdate = debounce((name, value) => this.props.dispatch(this.updateFilterValue({ [ name ]: value })), 250);

  separator(valueInput){
    let division;
    let value = valueInput.replace(/\s/g, '');
    if(value.length <= 8) {
      division = (value * 10) / 10000000;
      return Number(division).toFixed(1).replace('.', ',');
    } else if (value.length > 8) {
      division = (value * 10) / 10000000;
      return Number(division).toFixed(1).replace('.', ',');
    }
  }
}

function mapStateToProps(state) {
  const {
    filter: {
      value: {
        priceFrom,
        priceTo
      },
      valueInput
    },
    map: { showFullScreenMap }
  } = state;

  return {
    valueInput,
    priceFrom,
    priceTo,
    showFullScreenMap
  };
}

export default connect(mapStateToProps)(PriceInput);