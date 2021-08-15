import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import authOperations from '../../redux/operations/authOperations';
import { connect } from 'react-redux';
import Notify from '../Notify/Notify';
import notifySelector from '../../redux/selectors/registerNotifySelector';
import notifyAction from '../../redux/actions/notifyAction';
import { CSSTransition } from 'react-transition-group';

// Styles
import styles from './SignInForm.module.css';

const {
  container,
  siginUpTitel,
  form,
  form__titel,
  form__input,
  form__inputError,
  error,
  form__error,
  btnContainer,
  btnContainer__formBtn,
  btnContainer__socialBtn,
  google,
  login,
  login__link,
} = styles;

function SiginInForm({ isUserLoggedIn, notification, setNotifyFalse }) {
  if (notification.load === true) {
    setTimeout(() => {
      setNotifyFalse();
    }, 2500);
  }
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isUserLoggedIn) {
      console.log('before');

      history.push('/main');

      console.log('after');
    }
  }, [isUserLoggedIn]);

  return (
    <div className={container}>
      <CSSTransition
        in={notification.load === true}
        timeout={2500}
        classNames={styles}
        unmountOnExit
      >
        <Notify persone={notification.message} />
      </CSSTransition>
      <h2 className={siginUpTitel}>Вхід</h2>
      <Formik>
          <Form className={form}>
            <div className={btnContainer}>
              <a
                className={[btnContainer__socialBtn, google].join(' ')}
                href="https://thawing-inlet-66513.herokuapp.com/api/auth/google"
              >
                Увійти за допомогою Google
              </a>
            </div>
          </Form>
      </Formik>
      <p className={login}>
        Немає акаунту?{' '}
        <Link className={login__link} to={'/register'}>
          Зареєструватись
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.accessToken,
  notification: notifySelector.getNotify(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNotifyFalse: () => dispatch(notifyAction.showNotifyFalse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiginInForm);
