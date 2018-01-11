import React from 'react';

import Link from '../../../../components/Link';
import isMobile from '../../../../common/utils/isMobile';

import './styles.less';

const Partners = () => {
  let video = 'https://1.db-estate.cdn.pik-service.ru/attachment_pikru/0/1de31772-2b2b-f00e-49f0-674e8b778756/bank-logo-2_08786570cff7a63096a9902b34bf33a3.mp4';
  let videoWbem = 'https://1.db-estate.cdn.pik-service.ru/attachment_pikru/0/1de31772-2b2b-f00e-49f0-674e8b778756/bank-logos-desktop_1_b3b7d34912079e2d71b1c874df842d8a.webm';

  return (
    <div className='Partners'>
      <div className='Partners-container'>
        <div className="Partners-column">
          <p className='Partners-description'>ПАРТНЕРЫ</p>
          <h2 className='Partners-title'>Программы банков<br/>
            на любой вкус</h2>
          <p className='Partners-text'>Подавайте заявки онлайн и получите максимально выгодные предложения от банков</p>
          { !isMobile() && <Link to='/mortgage/partners/' className='Partners-link'>Партнеры и программы</Link> }
        </div>
        <div className="Partners-column">
          <video loop
                 autoPlay
                 playsInline
                 muted
                 className="Partners-video"
                 type='video/mp4'>
            <source src={ video }
                    type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
            <source src={ videoWbem }
                    type='video/webm; codecs="vp8, vorbis"'/>
          </video>
          { isMobile() && <Link to='/mortgage/partners/' className='Partners-link'>Партнеры и программы</Link> }
        </div>
      </div>
    </div>
  );
};

export default Partners;