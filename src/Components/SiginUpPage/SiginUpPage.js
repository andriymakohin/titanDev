import React from 'react';
import SiginUpForm from '../SiginUpForm/SiginUpForm';

// Styles
import styles from './SiginUpPage.module.css';

const {
  container,
  logo,
  siginUpForm,
  siginUpForm__wraper,
  siginUpForm__titel,
  authDesktop,
  authDesktop__wraper,
  authDesktop__titel,
  authMain,
  authPresents,
  authSasha,
} = styles;

function SiginUpPage() {
  return (
    <div className={container}>
      <section className={siginUpForm}>
        <div className={logo}>
          {/* <h1>Logo</h1> */}
        </div>
        <div className={siginUpForm__wraper}>
          <h2 className={siginUpForm__titel}>
            Мотивуйте cім'ю та себе!
          </h2>
          <SiginUpForm />
        </div>
      </section>

      <section className={authDesktop}>
        <div className={authDesktop__wraper}>
          <h2 className={authDesktop__titel}>
          Мотивуйте cім'ю та себе!
          </h2>
        </div>
        <div className={authMain}></div>
      </section>
    </div>
  );
}

export default SiginUpPage;
