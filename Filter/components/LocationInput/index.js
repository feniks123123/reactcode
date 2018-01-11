import React, { Component } from 'react';
import { connect } from 'react-redux';

import Close from '../icons/close';
import Metro from '../icons/metro';
import { updateFilteredComplexes, updateValueWithComplexes, actionClearValue } from './../../actions';

import isMobile from '../../../../common/utils/isMobile';

class LocationInput extends Component {
  componentDidUpdate(prevProps, { filtered: prevFiltered }) {
    const { showFullScreenMap, defaultLocations, location } = this.props;
    const { showFullScreenMap: prevShowFullScreenMap, defaultLocations: prevDefaultLocations, location: prevLocation } = prevProps;
    const { filtered } = this.state;

    if(prevShowFullScreenMap !== showFullScreenMap) {
      this.setState({ value: '' });
    }

    if(filtered !== prevFiltered) {
      this.setState({ list: filtered.length });
      this.setState({ count: 0 });
    }

    if(defaultLocations !== prevDefaultLocations) {
      this.setState({ list: defaultLocations.length });
    }
    if(!
        location && location !== prevLocation) {
      this.setState({ value: '' });
    }
  }

  state = {
    placeholderText: 'Где угодно',
    filtered       : [],
    focus          : false,
    value          : '',
    count          : null,
    list           : null,
  };

  updateFilterValue = isMobile() ? updateFilteredComplexes : updateValueWithComplexes;

  render() {
    const { placeholderText, value, focus } = this.state;
    let long = 'Filter-long';
    let input = 'Filter-long-input';
    let borderInput = 'Filter-long-border';
    let select = 'Filter-selectDropDown';

    if (focus) {
      long = `${ long } ${ long }-focus`;
      input = `${ input } ${ input }-focus`;
      borderInput = `${ borderInput } ${ borderInput }-focus`;
      select = `${ select } ${ select }--active`;
    }

    return (
      <div className={ long }>
        <span className="Filter-description">
          Местоположение
        </span>
        <span className="Filter-close"
              onClick={ this.clearInput }>
              {!!value ? <Close/> : null}
            </span>
        <input type="text"
               ref={ (c) => this.__input = c }
               onClick={ this.handleClick }
               onBlur={ this.handleBlur }
               onChange={ this.handleChange }
               onKeyUp={ this.onKeyUp }
               className={ input }
               value={ value }
               placeholder={ placeholderText }/>
        <span className={ borderInput }/>
        <div className={ select }>
          <ul className="Filter-selectDropDown-list">
            {this.renderList()}
          </ul>
        </div>
      </div>
    );
  }

  renderList() {
    const { defaultLocations } = this.props;
    const { filtered, value } = this.state;

    if (filtered.length && value) {
      return filtered.map((item, i) => this.renderItem(item, i));
    }

    if (!filtered.length && !value) {
      return defaultLocations.map((item, i) => this.renderItem(item, i));
    }

    if(!!value && !filtered.length) {
      return defaultLocations.map((item, i) => this.renderItem(item, i));
    }

    return null;
  }

  renderItem(location, i) {
    const { count } = this.state;
    const { name, metro, bulkIds } = location;
    let item = 'Filter-selectDropDown-item';

    if(count !== null && i === count) {
      item = `${ item } ${ item }--active`;
    }

    return (
      <li key={ i }
          className={ item }
          data-name={ name }
          ref={ c => this.__item = c }
          onClick={ () => this.selectItem(location) }>
        <div style={ !isMobile() ? { maxWidth: '170px' } : null }>
          {!metro ? null :
            <span className="Filter-selectDropDown-item-icon"><Metro/></span>
          }
          {name}
        </div>
        <div>
          <span className="Filter-selectDropDown-item-object">{bulkIds.length} объектов поблизости</span>
        </div>
      </li>
    );
  }

  selectItem(location) {
    this.setState({ value: location.name, focus: false });
    this.props.dispatch(this.updateFilterValue({ location }));
  };

  clearInput = () => {
    if(isMobile()) {
      let state = { focus: true, value: '' };
      this.__input.focus();
      return setTimeout(() => this.setState(state), 250);
    }

    this.setState({
      placeholderText: 'Где угодно',
      value          : '',
      countyArray    : [],
      locationArray  : []
    });
    this.props.dispatch(this.updateFilterValue({
      location: undefined
    }));
  };

  handleClick = event => {
    const { focus, value } = this.state;
    const { placeholder } = event.currentTarget;
    if (!focus) {
      if (placeholder === 'Где угодно') {
        return this.setState({
          placeholderText: 'Район, метро',
          focus          : true
        });
      }
      return this.setState({ focus: true });
    }

    if(!isMobile()) {
      if (!value) {
        return this.setState({
          placeholderText: 'Где угодно',
          focus          : false
        });
      }
    }
  };

  handleBlur = () => {
    const { focus, value } = this.state;
    let state = { focus: false };

    if (focus) {
      if (!value) {
        state = {
          ...state,
          placeholderText: 'Где угодно'
        };
      }
      setTimeout(() => this.setState(state), 200);
    }
  };

  onKeyUp = event => {
    const { value, count, list, filtered } = this.state;
    const { defaultLocations, dispatch } = this.props;

    if(event.keyCode === 40){
      if(count === null) {
        return this.setState({ count: 0 });
      }

      if(count < list - 1) {
        return this.setState({ count: count + 1 });
      }
    }

    if(event.keyCode === 38 && count !== 0){
      this.setState({ count: count - 1 });
    }

    if(event.keyCode === 13) {
      const locations = filtered && filtered.length ? filtered : defaultLocations;
      this.setState({ value: locations[ count ].name });
      dispatch(this.updateFilterValue({ location: locations[ count ] }));
    }

    if(event.keyCode === 8 && value.length === 1) {
      this.props.dispatch(this.updateFilterValue({
        location: undefined
      }));
    }
  };

  handleChange = event => {
    const { locations } = this.props;
    let value = event.target.value;
    let filtered = locations.filter(({ name }) => new RegExp(`^${ value }`, 'i').test(name));

    if (!value) {
      filtered = [];
    }

    this.setState({
      value,
      filtered
    });
  };
}

function mapStateToProps(state) {
  const {
    filter: {
      value: {
        location
      },
      initData: {
        location: {
          locations,
          defaultLocations
        }
      }
    },
    map: { showFullScreenMap }
  } = state;

  return {
    locations,
    location,
    defaultLocations,
    showFullScreenMap
  };
}

export default connect(mapStateToProps)(LocationInput);