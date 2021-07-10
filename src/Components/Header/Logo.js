import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import logoOrange from '../../assets/images/logo-orange.png';
import logoWhite from '../../assets/images/logo-white.png';

import styles from './styles.module.scss';

export default function Logo() {
  const history = useHistory();
  const location = useLocation();
  const whiteLogoLocations = ['/', '/login'];

  const handleRedirect = () => {
    history.push('/main');
  };

  return (
    <div className={styles.header__logo}>
      <img
        className={styles.header__logo_img}
        onClick={handleRedirect}
        alt="logo"
        src={
          whiteLogoLocations.includes(location.pathname)
            ? logoWhite
            : logoOrange
        }
      />
      <h1 className={styles.header__logo_text}>Планер</h1>
    </div>
  );
}
