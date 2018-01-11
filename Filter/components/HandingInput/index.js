import React, { Component } from 'react';
import { connect } from 'react-redux';

import bindClickOutside from '../../../../common/utils/clickOutside';
import Select from '../icons/Select';
import { updateValueWithComplexes, updateFilteredComplexes } from '../../actions';
import isMobile from '../../../../common/utils/isMobile';
import isLaptop from '../../../../common/utils/isLaptop';

class HandingInput extends Component {
  state = {
    name  : '',
    active: false,
    value : ''
  };

  componentDidUpdate({ handing: prevHanding }) {
    const { handing } = this.props;
    if (!handing && handing !== prevHanding) {
      this.setState({ value: '', name: '' });
    }
  }

  componentDidMount() {
    this.__unbindClickOutside = bindClickOutside(this.closeSelect, this.__area);
  }

  componentWillUnmount() {
    this.__unbindClickOutside();
  }

  render() {
    const { name, active } = this.state;
    let border = 'Filter-selectDropDown-border';
    let selectBorder = 'Filter-long-right';
    let selectText = 'Filter-long-select';

    if (active) {
      border = `${ border } ${ border }-focus`;
      selectBorder = `${ selectBorder } ${ selectBorder }-border`;
    }

    if (!!name) {
      selectText = `${ selectText } ${ selectText }--active`;
    }

    return (
      <div className={ 'Filter-long ' + selectBorder }
           ref={ (c) => this.__area = c }>
        <div className="Filter-description">Заселение до</div>
        <div className={ selectText }
             onClick={ this.handleOpenSelect }>
          {!name ? 'Не имеет значения' : name}
        </div>
        <span className='Filter-select'>
          <Select/>
        </span>
        <span className={ border }/>
        {this.renderListBlock()}
      </div>
    );
  }

  renderListBlock() {
    const { handingList } = this.props;
    const { active } = this.state;
    let css = 'Filter-selectDropDown';

    if (!isMobile() && active) {
      css = `${ css } ${ css }--active`;
    }

    if (!isLaptop()) {
      return (
        <div className={ css + ' Filter-selectDropDown-right' }>
          <ul className="Filter-selectDropDown-list">
            {handingList.map((item) => this.renderList(item))}
          </ul>
        </div>
      );
    } else {
      return (
        <select name='' onChange={ this.handleChange } className='Filter-selectOption'>
          {handingList.map((item) => this.renderSelect(item))}
        </select>
      );
    }
  }

  renderList({ id, name, value }) {
    const { name: currentName } = this.state;
    let css = 'Filter-selectDropDown-item';

    if (name === currentName) {
      css = `${ css } ${ css }--arrow`;
    }

    return (
      <li key={ id }
          onClick={ () => this.handleUpdateValue(value, name) }
          className={ css }>{name}</li>
    );
  }

  renderSelect({ id, name, value }) {
    return (
      <option value={ value } key={ id }>{name}</option>
    );
  }

  handleChange = (e) => {
    const { handingList, dispatch } = this.props;
    const value = e.target.value;
    const currentHading = handingList.find(handing => value === handing.value);
    let name = '';


    if (currentHading) {
      name = currentHading.name;
    }

    this.setState({ name });
    dispatch(updateFilteredComplexes({ handing: value }));
    this.closeSelect();
  };

  handleUpdateValue(value, name) {
    const { name: currentName } = this.state;
    if (currentName === name) {
      this.setState({ name: '' });
      this.props.dispatch(updateValueWithComplexes({ handing: '' }));
      this.closeSelect();
      return;
    }

    this.setState({ name });
    this.props.dispatch(updateValueWithComplexes({ handing: value }));
    this.closeSelect();
  }

  handleOpenSelect = () => this.setState({ active: !this.state.active });
  closeSelect = () => {
    if (this.state.active) {
      this.setState({ active: false });
    }
  };
}

function mapStateToProps(state) {
  const {
    filter: { value: { handing }, initData: { handingList } },
    map: { showFullScreenMap }
  } = state;

  return {
    handingList,
    handing,
    showFullScreenMap
  };
}

export default connect(mapStateToProps)(HandingInput);