import React from 'react';
import styles from './Logout.module.css';
import { connect } from 'react-redux';
import authOperations from '../../redux/operations/authOperations';

function Logout({ onClose, onLogout }) {
  return (
    <>
      <div className={styles.logoutContainer}>
        <p className={styles.logoutText}>Ви дійсно хочете вийти?</p>
        <div className={styles.logoutButtonContainer}>
          <button className={styles.logoutButton} onClick={onLogout}>
            Так
          </button>
          <button className={styles.logoutButton} onClick={onClose}>
            Ні
          </button>
        </div>
      </div>
    </>
  );
}

export default connect(null, { onLogout: authOperations.logOut })(Logout);
