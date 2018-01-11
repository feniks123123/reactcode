import React, { Component } from 'react';

import Open from './../icon/Open';
import bindClickOutside from '../../../../common/utils/clickOutside';

import Book from './../icon/Book';
import Passport from './../icon/Passport';
import Pdf from './../icon/Pdf';
import Reference from './../icon/Reference';
import Ticket from './../icon/Ticket';

import './styles.less';

class DocumentAccordion extends Component {

  state = {
    open: false,
  };

  componentDidMount() {
    this.__unbindClickOutside = bindClickOutside(() => setTimeout(this.closeProgram, 100), this.__area, null);
  }

  componentWillUnmount() {
    this.__unbindClickOutside();
  }

  render() {
    const { open } = this.state;
    const { title, documents, type } = this.props;
    let css = 'DocumentAccordion';
    let maxHeight = null;

    if(open) {
      css = `${ css } ${ css }--open`;
      maxHeight = this.__content.offsetHeight + 80;
    }

    return(
      <div className={ css }
           style={ { maxHeight } }
           ref={ (c) => this.__area = c }>
        <div className='DocumentAccordion-container' onClick={ this.open }>
          <div className='DocumentAccordion-wrapper'>
            <h3 className='DocumentAccordion-title'>{ title }</h3>
            <div className='DocumentAccordion-open'><Open/></div>
          </div>
        </div>
        { !!documents ?
          <div className='DocumentAccordion-content'
               ref={ c => this.__content = c }>
            { documents.map((item, i) => this.renderDocuments(item, i)) }
          </div> : type === 'subsidies' ? this.renderSubsidiesDocuments() :
          this.renderStaticDocuments() }
      </div>
    );
  }

  renderSubsidiesDocuments() {
      return (
        <div className='DocumentAccordion-content DocumentAccordion-content-subsidies'
             ref={ c => this.__content = c }
             onClick={ e => e.stopPropagation() }>
          <div className='DocumentAccordion-block'>
            <div className='DocumentAccordion-column'>
              <div className='DocumentAccordion-images'>
                <Passport/>
              </div>
              <div className='DocumentAccordion-wrapperText'>
                <h3 className='DocumentAccordion-titleDocument'>Паспорт гражданина РФ</h3>
              </div>
            </div>
            <div className='DocumentAccordion-column'>
              <div className='DocumentAccordion-images'>
                <Ticket/>
              </div>
              <div className='DocumentAccordion-wrapperText'>
                <h3 className='DocumentAccordion-titleDocument'>Свидетельства о рождении несовершеннолетних детей</h3>
              </div>
            </div>
          </div>
          <div className='DocumentAccordion-block'>
            <div className='DocumentAccordion-column'>
              <div className='DocumentAccordion-images'>
                <Book/>
              </div>
              <div className='DocumentAccordion-wrapperText'>
                <h3 className='DocumentAccordion-titleDocument'>Свидетельство о предоставлении субсидии</h3>
              </div>
            </div>
            <div className='DocumentAccordion-column'>
              <div className='DocumentAccordion-images'>
                <Reference/>
              </div>
              <div className='DocumentAccordion-wrapperText'>
                <h3 className='DocumentAccordion-titleDocument'>Договор на открытие ИБЦС</h3>
              </div>
            </div>
          </div>
          <p className='DocumentAccordion-dopText'>*При подключении программы «Субсидия+Ипотека», перечень документов меняется</p>
        </div>
      );
  }

  renderStaticDocuments() {
    return (
      <div className='DocumentAccordion-content'
           ref={ c => this.__content = c }
           onClick={ e => e.stopPropagation() }>
        <div className='DocumentAccordion-block'>
          <div className='DocumentAccordion-column'>
            <div className='DocumentAccordion-images'>
              <Passport/>
            </div>
            <div className='DocumentAccordion-wrapperText'>
              <h3 className='DocumentAccordion-titleDocument'>Паспорт гражданина РФ</h3>
              <p className='DocumentAccordion-description'>Оригинал</p>
            </div>
          </div>
          <div className='DocumentAccordion-column'>
            <div className='DocumentAccordion-images'>
              <Ticket/>
            </div>
            <div className='DocumentAccordion-wrapperText'>
              <h3 className='DocumentAccordion-titleDocument'>Военный билет</h3>
              <p className='DocumentAccordion-description'>Для лиц мужского пола призывного возраста (для возможности учета доходов)</p>
            </div>
          </div>
        </div>
        <div className='DocumentAccordion-block'>
          <div className='DocumentAccordion-column'>
            <div className='DocumentAccordion-images'>
              <Book/>
            </div>
            <div className='DocumentAccordion-wrapperText'>
              <h3 className='DocumentAccordion-titleDocument'>Трудовая книжка</h3>
              <p className='DocumentAccordion-description'>Или другой документ, подтверждающий занятость (трудовой договор и т.п.)</p>
            </div>
          </div>
          <div className='DocumentAccordion-column'>
            <div className='DocumentAccordion-images'>
              <Reference/>
            </div>
            <div className='DocumentAccordion-wrapperText'>
              <h3 className='DocumentAccordion-titleDocument'>Справка 2-НДФЛ</h3>
              <p className='DocumentAccordion-description'>Или другой документ, подтверждающий доход (справка по форме Банка, копия налоговой декларации и т.п.)</p>
            </div>
          </div>
        </div>
        <p className='DocumentAccordion-dopText'>Перечень документов может меняться в зависимости от программы кредитования и требований банков.</p>
      </div>
    );
  }

  renderDocuments({ title, link, description }, i){
    return (
      <a href={ link } target="_blank" className='DocumentAccordion-document' key={ i }>
        <div className='DocumentAccordion-document-images'>
          <Pdf/>
        </div>
        <div className='DocumentAccordion-wrapperText'>
          <h3 className='DocumentAccordion-document-title'>{ title }<span className='DocumentAccordion-document-title--hover'/></h3>
          <p className='DocumentAccordion-document-description'>{ description }</p>
        </div>
      </a>
    );
  }

  closeProgram = () => {
    this.setState({ open: false });
  };

  open = () => {
    this.setState({ open: !this.state.open });
  }
}

export default DocumentAccordion;