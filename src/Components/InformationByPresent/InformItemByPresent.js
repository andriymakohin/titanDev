import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';
import ChangeFormPresent from '../../components/ChangePresentForm/ChangePresentForm';
import styles from './informItemByPresent.module.css';
import defaultImage from '../../assets/informationByPresent/Group 299.png';
import maleImage from '../../assets/informationByPresent/Group 292.png';
import femaleImage from '../../assets/informationByPresent/Group 291.png';
import subMenu_disable from '../../assets/informationByPresent/Group 280.svg';
import subMenu_active from '../../assets/informationByPresent/Group 281.svg';
import { connect } from 'react-redux';
import PersoneSelectors from '../../redux/selectors/PersoneSelectors';

import AlertReward from './alert.js';
import { CSSTransition } from 'react-transition-group';
import styleAlert from './styleAlert.module.css';
import './transition/flash.css';

class InformItemByPresent extends Component {
  state = {
    display: 'none',
    modal: false,
    alertFalse: false,
    onShowName: false,
    lacks: 0,
  };

  onChangeSubmenu = () => {
    if (this.state.display === 'none') {
      this.setState({
        display: 'flex',
      });
    } else {
      this.setState({
        display: 'none',
      });
    }
  };

  showModal = () => {
    this.setState({
      modal: true,
    });
  };

  onClose = () => {
    this.setState({
      modal: false,
    });
  };

  onMouseMoveEnter = (e) => {
    this.setState({ onShowName: !this.state.onShowName });
  };

  onMouseMoveLeave = () => {
    this.setState({ onShowName: false });
  };

  handleBuyPreset = (idPresent, reward, personeId) => {
    const { persone } = this.props;
    const person = persone.find((person) => person._id === personeId);

    if (person.stars < reward) {
      const lacks = reward - person.stars;
      this.setState({ lacks });
      this.onMouseMoveEnter();
      this.setState({ alertFalse: true });
      setTimeout(() => {
        this.setState({ alertFalse: false });
        this.onMouseMoveEnter();
      }, 2500);
      return;
    } else {
      this.props.buyPresent(idPresent, reward, personeId);
    }
  };

  render() {
    const {
      image,
      title,
      reward,
      personeId,
      idPresent,
      deletePresent,
      person,
    } = this.props;
    const { display, modal, alertFalse, onShowName, lacks } = this.state;
    const mess = alertFalse ? (
      <p className={styles.name_star}>Не вистачає {`${lacks}`}</p>
    ) : (
      `${person.name}`
    );
    
    return (
      <>
        {modal && (
          <Modal
            persone={
              <ChangeFormPresent
                onClose={this.onClose}
                personeId={personeId}
                title={title}
                reward={reward}
                idPresent={idPresent}
              />
            }
            onClose={this.onClose}
          />
        )}
        <ul className={styles.presentItem_container}>
          <li className={styles.presentItem_changePresent}>
            <div
              className={styles.presentItem_button__submenu}
              onClick={this.onChangeSubmenu}
            >
              <img
                src={display === 'none' ? subMenu_disable : subMenu_active}
                className={styles.presentItem_image__subMenu}
                alt='subMenuImg'
              ></img>
              <ul
                className={styles.presentItem_subMenu}
                style={{ display: this.state.display }}
              >
                <li className={styles.presentItem_subMenu__angle}></li>
                <li>
                  <button
                    className={styles.presentItem_subMenu__button}
                    onClick={this.showModal}
                  >
                    Редагувати
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => deletePresent(idPresent)}
                    className={styles.presentItem_subMenu__button}
                  >
                    Видалити
                  </button>
                </li>
              </ul>
            </div>
          </li>
          <li className={styles.presentItem_images}>
            <img
              className={styles.presentItem_mainImage}
              src={image === '' ? defaultImage : image}
              alt='presentImg'
            ></img>

            <div className={styles.box_overlay}>
              <CSSTransition
                in={onShowName}
                classNames="flash"
                timeout={500}
                unmountOnExit
              >
                <span className={styles.name_persone}>{mess}</span>
              </CSSTransition>
            </div>
            <img
              onMouseEnter={this.onMouseMoveEnter}
              onMouseLeave={this.onMouseMoveLeave}
              className={styles.presentItem_genderImage}
              alt='personImg'
              src={person.gender === 'male' ? maleImage : femaleImage}
            ></img>
          </li>
          <li className={styles.presentItem_titleAndButton}>
            <div className={styles.presentItem_title}>
              <p className={styles.presentItem_name}>{title}</p>
              <div className={styles.presentItem_block__cost}>
                <p className={styles.presentItem_cost}>{reward}</p>
              </div>
            </div>
            <div className={styles.presentItem_block__button}>
              <button
                onClick={() => this.handleBuyPreset(idPresent, reward, personeId)}
                className={styles.presentItem_button}
              >
                Придбати
                <CSSTransition
                  in={alertFalse}
                  classNames={styleAlert}
                  timeout={250}
                  unmountOnExit
                >
                  <AlertReward> </AlertReward>
                </CSSTransition>
              </button>
            </div>
          </li>
        </ul>
      </>
    );
  }
}
const mapSatateToProps = (state) => ({
  persone: PersoneSelectors.getPersones(state),
});

export default connect(mapSatateToProps, null)(InformItemByPresent);
