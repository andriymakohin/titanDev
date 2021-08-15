import React, { Component } from 'react';
import InformationItem from './InformationItem';
import house from '../../assets/InformationOnPersone-Images/image20.svg';
import style from './informationList.module.css';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import AddFamilyForm from '../AddPersoneForm/Form';
import personerenSelectors from '../../redux/selectors/PersoneSelectors';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class InformationList extends Component {
  state = {
    modal: false,
  };

  toggleModal = () => {
    this.setState((state) => ({ modal: !state.modal }));
  };

  render() {
    const { modal } = this.state;
    const { persones, personeId } = this.props;
    console.log('inform',personeId)
    return (
      <>
        {modal && (
          <Modal onClose={this.toggleModal}>
            <AddFamilyForm onClose={this.toggleModal}></AddFamilyForm>
          </Modal>
        )}
        <div className={style.personeSidebar_container}>
          <div className={style.personeSidebar_header}>
            <img
              className={style.personeSidebar_house}
              src={house}
              alt="home"
            />
            <h2 className={style.personeSidebar_title}>Сім'я</h2>
          </div>
          <ul className={style.personeSidebar_persones}>
            <TransitionGroup component="ul" className={style.personeSidebar_persones}>
              {persones.map((persone) => (
                 <CSSTransition in={true} appear={true} timeout={300} classNames={style} key={persone._id}>
                  <li className={style.personeSidebar_item} key={persone._id}>
                    <InformationItem
                      personeId={persone._id}
                      male={persone.gender}
                      name={persone.name}
                      balance={persone.stars ? persone.stars : 0}
                    />
                  </li>
                  </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>

          <button
            onClick={this.toggleModal}
            className={style.personeSidebar_button}
          >
            Додати члена сім'ї +
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  persones: personerenSelectors.getPersones(state),
});

export default connect(mapStateToProps, null)(InformationList);
