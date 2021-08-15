import React from 'react';
import style from './notify.module.css';

const Notify = ({ persone }) => {
  return (
    <div className={style.notify__container}>
      <p className={style.notify__text}>{persone}</p>
    </div>
  );
};

export default Notify;
