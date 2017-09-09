import React, { Component } from 'react';
import { connect } from 'react-redux';

import Popup from '../Popup';
import PopupDropDown from '../PopupDropDown';
import DocumentsLink from '../../DocumentsLink';

import isMobile from '../../../common/utils/isMobile';

import './styles.less';

class BlockPage extends Component {
  render() {
    const {
      modalShow,
      translateX,
      list,
      mortgage,
      conditions: {
        carplace_conditions: conditions
      },
      type,
      infoBlock: {
        developer_url,
        guid,
        name,
        url
      }
    } = this.props;

    return(
      <div className="BlockPage-contentWrapper"
           style={ modalShow ? { transform: `translateX(${ translateX })` } : null }>
        { !!conditions && !!conditions.conditions ?
          <div className="BlockPage-credit">
            {conditions.conditions.map((item, i) => this.renderOffer(item, i, conditions))}
          </div>
          :
          null }
        <div className="BlockPage-inside">
          <div className="BlockPage-blockWrapper">
            { list.map((item, i) => <PopupDropDown place={ item } id={ i } key={ i } type={ type } />) }
          </div>
          { !!developer_url ? <DocumentsLink url={ `${ developer_url }/?block=${ guid }` }/> : null}
          {!!mortgage ?
            <div className="BlockPage-offer">
              {!isMobile() ? <div className="BlockPage-offer--bg"/> : null}
              <a href={ `//www.pik.ru${ url }/facts/mortgage?type=cars` }>
                <div className="BlockPage-offer--content">
                  <div className="BlockPage-offer--title">
                    Ипотека <br/> на машиноместа
                  </div>
                  <div className="BlockPage-offer--percent">
                    от { mortgage.percent }%*
                  </div>
                  <div className="BlockPage-offer--description">
                    * { mortgage.name }
                  </div>
                </div>
              </a>
            </div> :
            null}
        </div>
        <Popup slide={ list } name={ name } />
      </div>
    );
  }

  renderOffer = (item, i, conditions) => {
    return (<p dangerouslySetInnerHTML={
      { __html:
        `${ item.title } ${ item.listItem.map(({ text }, i) =>
          ` ${ (conditions.length === 1 || isMobile()) ? '' : `<br/>` }${ text }`) } `
      } }/>);
  };
}

function mapStateToProps(state) {
  const { 
    modal: translateX,
    show: modalShow
  } = state;
  
  return {
    translateX,
    modalShow
  };
}

export default connect(mapStateToProps)(BlockPage);