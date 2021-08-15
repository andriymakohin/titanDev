import React, { Component } from 'react';
import { connect } from 'react-redux';
import exitButton from './exit.svg';
import styles from './UserInfo.module.css';
import Modal from '../Modal/Modal';
import Logout from '../Logout';
import authSelectors from '../../redux/selectors/authSelectors';

class UserInfo extends Component {
  state = {
    isRenderModal: false,
  };
  handleOpenModal = (e) => {
    this.setState({ isRenderModal: true });
  };
  handleCloseModal = (e) => {
    this.setState({ isRenderModal: false });
  };

  render() {
    const { isRenderModal } = this.state;
    const { avatarURL, name } = this.props;
    return (
      <>
        <div className={styles.userInfoContainer}>
          <span className={styles.userPhotoContainer}>
            <img
              src={avatarURL}
              alt="profileImage"
              className={styles.userPhoto}
            />
          </span>

          <p className={styles.userName}>{name}</p>
          <button onClick={this.handleOpenModal}>
            <img src={exitButton} alt="exit-button" width="21px" />
          </button>
          {isRenderModal && (
            <Modal onClose={this.handleCloseModal}>
              <Logout onClose={this.handleCloseModal} />
            </Modal>
          )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return authSelectors.getUser(state);
};

export default connect(mapStateToProps)(UserInfo);
