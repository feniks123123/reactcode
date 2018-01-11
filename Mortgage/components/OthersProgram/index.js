import React from 'react';

import Program from '../Program';
import isMobile from '../../../../common/utils/isMobile';

import './styles.less';

const OthersProgram = ({ programs, name, icon }) => {
  return (
    <div className='OthersProgram'>
      <div className='OthersProgram-container'>
        <div className='OthersProgram-wrapper'>
          <div className='OthersProgram-logo'>
            <div dangerouslySetInnerHTML={ { __html: icon } }/>
            { !isMobile() && <h2 className='OthersProgram-title'>Другие программы от { name }</h2> }
          </div>
        </div>
        { !!isMobile() && <h2 className='OthersProgram-title'>Другие программы от { name }</h2> }
        <div className='OthersProgram-programs'>
          { !!programs && programs.map((item, i) => <div key={ i } className='OthersProgram-programWrapper'><Program item={ item } bg='#F9F9F9' /></div>) }
        </div>
      </div>
    </div>
  );
};


export default OthersProgram;