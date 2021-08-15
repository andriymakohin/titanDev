import React, { Component } from 'react';
import styles from './SideBarLeft.module.css';

import Modal from '../Modal/Modal';
import AddPersoneForm from '../AddPersoneForm/Form';

export default class  SideBarLeft extends Component {
  state = {isRenderModal: false };

  handleOpenModal = () => {
    this.setState({ isRenderModal: true });
  };
  handleCloseModal = () => {
    this.setState({ isRenderModal: false });
  };

  render() {
    const { isRenderModal } = this.state;
    return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <img
              src=""
              alt="heading-logo"
              className={styles.headingLogo}
            /> 
        </div>
        <div className={styles.personeContainer}>
          <div className={styles.personeForm}></div>
          <div className={styles.personeForm}></div>
        </div>    
        
          <button
            onClick={this.handleOpenModal} 
            className={styles.btnAddBaby}
          >
            Додати члена сім'ї +
          </button>
            {isRenderModal && (
              <Modal  onClose={this.handleCloseModal}>
                <AddPersoneForm onClose={this.handleCloseModal} />
              </Modal>
            )} 
      </div>
    </>
    );
  };
}
