import React from 'react';

import {useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { modalLogout } from "../../redux/slice";
import UserLogOut from "../../assets/icons/hiclipart.png";
import ProfileImage from "../../image/santa.png";

import Logo from './Logo';
import Navigation from './Navigation';

import styles from './styles.module.scss';

function Header() {
  const dispatch = useDispatch();
    
    const { user, modal } = useSelector((state) => state.session);
    const openModal = () => {
        dispatch(modalLogout(true));
      };
    console.log(user)
  return (
    <div className={styles.header__container}>
      <Logo />
      {<Navigation />}
    {modal && <Modal />}
      <div className={styles.userInfoContainer}>
          <span className={styles.userPhotoContainer}>
            <img
              src={user.photo ? user.photo : ProfileImage}
              className={styles.userPhoto}
              alt="profile_image"
            />
          </span>

          <p className={styles.userName}>{user.name}</p>
          <button onClick={() => dispatch(openModal)}>
          <img
            // className="user-logout"
            src={UserLogOut}
            width="21px"
            alt="user_logout"
          ></img>
          </button>
        </div>
    </div>
  );
}

export default Header;
