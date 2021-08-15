import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import authOperations from '../../redux/operations/authOperations';
import { connect } from 'react-redux';
import Notify from '../Notify/Notify';
import notifySelector from '../../redux/selectors/registerNotifySelector';
import notifyAction from '../../redux/actions/notifyAction';
import { CSSTransition } from 'react-transition-group';

// Styles
import styles from './SiginUpForm.module.css';

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
  facebook,
  login,
  login__link,
} = styles;

function SiginUpForm({ notification, setNotifyFalse }) {
  const dispatch = useDispatch();
  if (notification.load === true) {
    setTimeout(() => {
      setNotifyFalse();
    }, 7500);
  }
  return (
    <div className={container}>
      <CSSTransition
        in={notification.load === true}
        timeout={250}
        classNames={styles}
        unmountOnExit
      >
        <Notify persone={notification.message} />
      </CSSTransition>
      <h2 className={siginUpTitel}>Реєстрація</h2>
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
        Уже є аккаунт?{' '}
        <Link className={login__link} to={'/login'}>
          Увійти
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  notification: notifySelector.getNotify(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNotifyFalse: () => dispatch(notifyAction.showNotifyFalse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiginUpForm);
