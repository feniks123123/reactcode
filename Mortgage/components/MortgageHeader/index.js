import React from 'react';
import animationScroll from '../../../../common/utils/animationScroll';
import isMobile from '../../../../common/utils/isMobile';
import clientRendering from '../../../../common/utils/clientRendering';

import './styles.less';


const MortgageHeader = () => {
  return (
    <div className='MortgageHeader'>
      <div className='MortgageHeader-container'>
        <div className="MortgageHeader-column">
          <h1 className='MortgageHeader-title'>Ипотека</h1>
          <p className='MortgageHeader-text'>Отправьте заявку онлайн сразу
            в&nbsp;несколько банков и сократите время оформления ипотеки.</p>
          <a href='#'
             onClick={ scrollToCalculate }
             className='MortgageHeader-link'>Подобрать программу</a>
        </div>
        <div className="MortgageHeader-column">
          <div className='MortgageHeader-images'/>
        </div>
      </div>
    </div>
  );
};

const scrollToCalculate = e => {
  e.preventDefault();
  animationScroll(document.getElementById('MortgageCalculator').offsetTop - 50, isMobile() ? 200 : 600);
};

export default MortgageHeader;