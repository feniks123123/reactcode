import React from 'react';

import './styles.less';

const SimplyMakeUp = ({ title, text }) => {
  return (
    <div className='SimplyMakeUp'>
      <div className='SimplyMakeUp-container'>
        <div className='SimplyMakeUp-column'>
          <p className='SimplyMakeUp-description'>ПИК-ИПОТЕКА</p>
          <h2 className='SimplyMakeUp-title' dangerouslySetInnerHTML={ { __html: title } }/>
        </div>
        <div className='SimplyMakeUp-column'>
          <p className='SimplyMakeUp-text'>{ text }</p>
        </div>
      </div>
    </div>
  );
};

export default SimplyMakeUp;