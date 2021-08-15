import React from 'react';
import styles from './Nav.module.css';
import tasks from './img/tasks.png';
import present from './img/present.png';
import family from './img/family.png';


function Navigation() {
  return (
    <>   
      <div className={styles.navContainer}>
        <div className={styles.familyBlock}>
          <img
            src={family}
            alt="family"
            className={styles.img}
          />
          <p className={styles.text}>Сім'я</p>
        </div>
        <div className={styles.taskBlock}>
          <img
            src={tasks}
            alt="tasks"
            className={styles.img}
          />
          <p className={styles.text}>Задачі</p>
        </div>
        <div className={styles.presentBlock}>
          <img
            src={present}
            alt="present"
            className={styles.img}
          />
          <p className={styles.text}>Подарунки</p>
        </div> 
      </div>
    </>
  );
}
export default Navigation;