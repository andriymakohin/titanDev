import React from 'react';
import {CSSTransition} from 'react-transition-group';

import Logo from './Logo';
import Navigation from './Navigation';
import UserInfo from '../UserInfo';

import styles from './styles.module.scss';

import { connect } from 'react-redux';

function Header({ userToken }) {
  return (
    <CSSTransition in={true} appear={true} timeout={700} classNames={styles}>
    <div className={styles.header__container}>
      <Logo />
      {userToken && <Navigation />}
      {userToken && <UserInfo />}
    </div>
    </CSSTransition>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.user.accessToken,
});

export default connect(mapStateToProps)(Header);
