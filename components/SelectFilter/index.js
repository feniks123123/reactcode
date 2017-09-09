import React, { Component } from 'react';

import bindClickOutside from '../../../../common/utils/clickOutside';
import Select from '../IconFilter/Select';

const test = [
  'Идет заселение',
  'Идет заселение',
  'Идет заселение',
  'Идет заселение',
  'Идет заселение'
];

class SelectFilter extends Component {

  state = {
    activeSelect: false
  };

  componentDidMount(){
    this.__unbindClickOutside = bindClickOutside(this.handlerClickOutside, this.__area);
  }

  componentWillUnmount() {
    this.__unbindClickOutside();
  }

  render(){
    const { activeSelect } = this.state;
    let select = 'ComplexesFilter-selectDropDown';
    let selectBorder = 'ComplexesFilter-long-right';

    if (activeSelect) {
      select = `${ select } ${ select }--active`;
      selectBorder = `${ selectBorder } ${ selectBorder }-border`;
    }

    return(
      <div className={ 'ComplexesFilter-long ' + selectBorder }
           ref={ (c) => this.__area = c }>
        <div className="ComplexesFilter-description">Заселение до</div>
        <div className="ComplexesFilter-long-select"
              onClick={ () => this.openSelect() }>Не имеет значение</div>
        <span className='ComplexesFilter-select'>
          <Select/>
        </span>
        <div className={ select + ' ComplexesFilter-selectDropDown-right' }>
          <ul className="ComplexesFilter-selectDropDown-list">
            { test.map((item, i) => this.renderList(item, i)) }
          </ul>
        </div>
        {/*<select name="" id="" className="ComplexesFilter-long-selected">*/}
          {/*<option value="test">test</option>*/}
        {/*</select>*/}
      </div>
    );
  }

  renderList(item, i){
    return (
      <li key={ i }
          onClick={ (event) => this.clickList(event) }
          className='ComplexesFilter-selectDropDown-item'>{item}</li>
    );
  }

  clickList(event) {
    event.currentTarget.classList.toggle('ComplexesFilter-selectDropDown-item--arrow');
  }

  openSelect(){
    this.setState({ activeSelect: true });
  }

  handlerClickOutside = () => {
    this.setState({ activeSelect: false });
  };
}

export default SelectFilter;