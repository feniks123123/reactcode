import React from 'react';

import { outlineData } from './outlineData';

import './styles.less';

const Outline = () => {
  return(
    <div className='Outline'>
      <div className='Outline-container'>
        <h2 className='Outline-title'>Схема проведения сделки</h2>
        { !!outlineData && outlineData.map((item, i) => renderList(item, i)) }
      </div>
    </div>
  );
};

const renderList = ({ title, text }, i) => {
  return (
    <div className='Outline-list-wrapper' key={ i }>
      <div className='Outline-list-numberWrapper'>
        <div className='Outline-list-number'>{ i + 1 }</div>
      </div>
      <div className='Outline-list-container'>
        <h3 className='Outline-list-title'>{ title }</h3>
        <p className='Outline-list-text'>{ text }</p>
      </div>
    </div>
  );
};

export default Outline;