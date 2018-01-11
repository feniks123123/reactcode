import React from 'react';

import Link from '../../../../components/Link';
import getNameBrowser from '../../../../common/utils/getNameBrowser';
import isTablet from '../../../../common/utils/isTablet';

import './styles.less';

const ObjectCard = ({ items, title }) => {
  let css = 'ObjectCard';

  if(getNameBrowser() === 'Safari' && !isTablet()) {
    css = 'ObjectCard ObjectCard-safari';
  }

  return (
    <div className={ css }>
      <div className='ObjectCard-container'>
        <h2 className='ObjectCard-title'>{ title }</h2>
          <div className='ObjectCard-wrapper'>
            { !!items.length && items.map((item, i) => renderCard(item, i)) }
          </div>
      </div>
    </div>
  );
};

const renderCard = (item, i) => {
  return(
    <div className='ObjectCard-card' key={ i }>

      <Link to={ `https://pik.ru${ item.url }` } className='ObjectCard-card-link'>
        <div style={ { backgroundImage: `url(${ item.img.main })` } } className='ObjectCard-card-images'/>
        <p className='ObjectCard-card-text'>{ item.name }</p>
      </Link>
    </div>
  );
};

export default ObjectCard;
