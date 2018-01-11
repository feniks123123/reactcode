import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import bindClickOutside from '../../../../common/utils/clickOutside';

import Open from './../icon/Open';
import Program from './../Program';
import animationScroll from '../../../../common/utils/animationScroll';
import isMobile from '../../../../common/utils/isMobile';
import parseQuery from '../../../../common/utils/parseQuery';

import './styles.less';

class BankAccordion extends Component {

  componentDidMount() {
    const { location: { search } } = this.props;
    const { id } = parseQuery(search);

    if(this.__area.id === id) {
      animationScroll(this.__area.offsetTop - 61, 400);
      setTimeout(this.openProgram(), 500);
    }
    this.__unbindClickOutside = bindClickOutside(() => setTimeout(this.closeProgram, 100), this.__area, null);
  }

  componentWillUnmount() {
    this.__unbindClickOutside();
  }

  state = {
    open     : false,
    openDelay: false,
  };

  render(){
    const { open } = this.state;
    const { id, min_percent, name, abbreviation, icon, programs, min_first_payment, bank_color } = this.props.bank;
    let css = 'BankAccordion';
    let bankProgram = 'BankAccordion-program-container';
    let background = '#fff';
    let programHeight = null;

    if(open) {
      css = `${ css } ${ css }--open`;
      background = bank_color || '#E9ECEF';
      programHeight = this.__program.offsetHeight + 80;
    }

    if(!open) {
      css = `${ css } ${ css }--close`;
      bankProgram = `${ bankProgram } ${ bankProgram }--close`;
    }

    let minSum = `от ${ min_first_payment } %`;

    return (
      <div className={ css }
           id = { id }
           style={ { background, height: programHeight } }
           ref={ (c) => this.__area = c }>
        <div className='BankAccordion-container' onClick={ this.openProgram }>
          <div className='BankAccordion-name-container'>
            <div className='BankAccordion-name-images' dangerouslySetInnerHTML={ { __html: icon } }/>
            <p className='BankAccordion-text'>{ !!abbreviation ? abbreviation : name }</p>
          </div>
          <div className='BankAccordion-text BankAccordion-text-percent'>от { min_percent } %</div>
          <div className='BankAccordion-text BankAccordion-text-price'>{ minSum }</div>
          <div className='BankAccordion-open'>
            <Open/>
          </div>
        </div>
        <div className={ bankProgram }
             style={ { background } }
             ref={ c => this.__program = c }>
          { programs.map((item, i) => this.renderProgramWrapper(item, i)) }
        </div>
      </div>
    );
  }

  renderProgramWrapper(item, i) {
    const { openDelay, open } = this.state;
    let programShow = 'BankAccordion-programWrapper';
    let animationDelay;

    if(openDelay) {
      programShow = `${ programShow } flash`;
      animationDelay = `0.${ (i + 1) }s`;
    }

    if(!open) {
      programShow = `${ programShow } noFlash`;
    }

    return(
      <div className={ programShow } style={ { animationDelay } } key={ i }>
        <div className="BankAccordion-programHover">
          <Program item={ item }/>
        </div>
      </div>
    );
  }

  closeProgram = () => {
    this.setState({ open: false, openDelay: false });
  };

  openProgram = () => {
    this.setState({ open: !this.state.open });
    setTimeout(() => this.setState({ openDelay: !this.state.openDelay }), 300);
    if(!this.state.open && !isMobile()) {
      setTimeout(() => animationScroll(this.__area.offsetTop - 61), 400);
    }
  };
}

export default withRouter(BankAccordion);

