import React, { useEffect } from 'react';
import SignInForm from '../SignInForm/SignInForm';
import styles from './SignInPage.module.css';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import authOperation from '../../redux/operations/authOperations';

const {
  container,
  signIn,
  logo,
  signInForm,
  pageTitel,
  loginDesctop,
  DesktopPage,
  desktopTitel,
  authMain,
  authPresents,
  authSasha,
} = styles;

function SignInPage({ userToken, onGetCurrentUser }) {
  const history = useHistory();

  useEffect(() => {
    if (userToken) {
      onGetCurrentUser();
      history.push('/main');
    }
  }, [userToken]);
  return (
    <div className={container}>
      <section className={signIn}>
        <div className={logo}>{/* <h1>Logo</h1> */}</div>
        <div className={signInForm}>
          <h2 className={pageTitel}>Мотивуйте cім'ю та себе!</h2>

          <SignInForm />
        </div>
      </section>

      <section className={loginDesctop}>
        <div className={DesktopPage}>
          <h2 className={desktopTitel}>
            Мотивуйте сім'ю та себе!
          </h2>
          <div className={authMain}></div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.user.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  onGetCurrentUser: () => dispatch(authOperation.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
