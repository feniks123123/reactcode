import React from 'react';

import Link from '../../../../components/Link';
import Back from '../icon/Back';

import './styles.less';

const MortgageProgramBanner = ({ bank, program }) => {
  const background = bank.bank_color || '#E9ECEF';

  return (
    <div className="MortgageProgramBanner"
         style = { { background } }>
      <Link to={ `/mortgage/partners/` }>
        <Back/>
      </Link>
      { bank && program && renderTextBlock(bank.name, bank.abbreviation, bank.license, program.name, bank.icon) }
    </div>
  );
};

function renderTextBlock(name, abbreviation, license = '', title, icon) {
  return (
    <div className="MortgageProgramBanner-container">
      <div className="MortgageProgramBanner-icon" dangerouslySetInnerHTML={ { __html: icon } }/>
      <div className="MortgageProgramBanner-textWrapper">
        <span className="MortgageProgramBanner-name">{ !!abbreviation ? abbreviation : name }</span>
        <h1 className="MortgageProgramBanner-title" dangerouslySetInnerHTML={ { __html: title } }/>
        <p className="MortgageProgramBanner-disclaimer">{ `${ name }. ${ license }` }</p>
      </div>
    </div>
  );
}

export default MortgageProgramBanner;
