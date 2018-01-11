import React from 'react';

import Link from '../../../../components/Link';

import { conditionsCredit } from './data';

import './styles.less';

const ConditionsCredit = ({ program, bankName, link, description, contactUrl }) => {

  let array = !!program ? program : conditionsCredit;

  return(
    <div className='ConditionsCredit'>
      <div className='ConditionsCredit-container'>
        <h2 className='ConditionsCredit-title'>Основные условия кредитования</h2>
        <div className='ConditionsCredit-wrapper'>
          { array.map((item, i) => renderCondition(item, i)) }
        </div>
        <div className='ConditionsCredit-info'>
          <div className='ConditionsCredit-info-column'>
            { !!description && <p className='ConditionsCredit-info-text' dangerouslySetInnerHTML={ { __html: description } }/> }
          </div>
          <div className='ConditionsCredit-info-column'>
            <Link to={ `https://www.pik.ru/contacts${ contactUrl }` } className='ConditionsCredit-info-link'>Офисы продаж ГК ПИК</Link>
            { !!link && <Link to={ link } target = '_blank' className='ConditionsCredit-info-link'> { `Сайт ${ bankName }` }</Link> }
          </div>
        </div>
      </div>
    </div>
  );
};

const renderCondition = ({ name, description }, i) => {
  return(
    <div className='ConditionsCredit-content' key={ i }>
      <div className='ConditionsCredit-content-column'>
        <h3 className='ConditionsCredit-content-title'>{ name }</h3>
      </div>
      <div className='ConditionsCredit-content-column'>
        <div className='ConditionsCredit-content-text' dangerouslySetInnerHTML={ { __html: description } } />
      </div>
    </div>
  );
};

export default ConditionsCredit;