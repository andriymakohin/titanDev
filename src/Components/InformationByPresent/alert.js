import React from 'react';
import style from './alert.module.css';

const alertNotLacksReward = ({ text }) => {
  return (
    <div className={style.container}>
      <span className={style.text}> </span>
    </div>
  );
};

export default alertNotLacksReward;
