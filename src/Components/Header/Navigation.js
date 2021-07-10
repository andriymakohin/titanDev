import React from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import Media from 'react-media';

import family from '../../assets/images/navigation/family.png';
import present from '../../assets/images/navigation/present.png';
import task from '../../assets/images/navigation/tasks.png';

import styles from './styles.module.scss';

export default function Navigation() {
  const location = useLocation();
  return (
    <div className={styles.header__navigation}>
      <NavLink
        className={
          location.pathname === '/main'
            ? styles.header__navigation_button__active
            : styles.header__navigation_button
        }
        to="/main"
      >
        <img className={styles.header__navigation_button_img} alt="family" src={family} />
        <span className={styles.header__navigation_button_text}>Сім'я</span>
      </NavLink>
      <Media
        queries={{
          small: '(max-width: 767px)',
          medium: '(min-width: 768px) and (max-width: 1250px)',
          large: '(min-width: 1250px)',
        }}
      >
        {(matches) =>
          matches.large ? (
            <NavLink
              className={
                location.pathname === '/main'
                  ? styles.header__navigation_button__active
                  : styles.header__navigation_button
              }
              to="/main"
            >
              <img
                className={styles.header__navigation_button_img}
                alt="task"
                src={task}
              />
              <span className={styles.header__navigation_button_text}>
                Задачі
              </span>
            </NavLink>
          ) : (
            <NavLink
              className={
                location.pathname === '/tasks'
                  ? styles.header__navigation_button__active
                  : styles.header__navigation_button
              }
              to="/tasks"
            >
              <img
                className={styles.header__navigation_button_img}
                alt="task"
                src={task}
              />
              <span className={styles.header__navigation_button_text}>
                Задачі
              </span>
            </NavLink>
          )
        }
      </Media>

      <NavLink
        className={
          location.pathname === '/presents'
            ? styles.header__navigation_button__active
            : styles.header__navigation_button
        }
        to="/presents"
      >
        <img className={styles.header__navigation_button_img} alt="present" src={present} />
        <span className={styles.header__navigation_button_text}>Подарунки</span>
      </NavLink>
    </div>
  );
}
