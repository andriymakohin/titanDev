import React, { useState} from 'react';
import styles from './addFormTask.module.scss';

import star from '../../assets/images/changeStar.png';
import select from '../../assets/images/changeSelect.png';

import taskOpeartions from '../../redux/operations/tasksOperation';
import { connect } from 'react-redux';

const AddFormTask = ({ persone, addTask, onClose }) => {
  const [personeId, setPersoneId] = useState('');
  const [title, setTitle] = useState('');
  const [reward, setReward] = useState('');
  const [time, setTime] = useState('');
  const [checkAllInput, setCheckAllInput] = useState(true);

  // const handleCloseClick = () => {};

  // const handleCancel = () => {};

  const handleSave = () => {
    if (!personeId || !title || !reward || !time) {
      setCheckAllInput(false);
      return;
    }
    addTask(personeId, title, reward, time);
    onClose();
  };

  return (
    <div className={styles.changetask__form}>
      <svg
        onClick={onClose}
        className={styles.changetask__close}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L11 11" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 11L11 0.999999" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <h1 className={styles.changetask__title}>Додавання задачі</h1>
      <div className={styles.changetask__input}>
        <label htmlFor="name">Назва</label>
        <input
          className={styles.changetask__inputLong}
          id="name"
          type="text"
          placeholder="Введіть назву"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.changetask__input}>
        <label htmlFor="task">Призначення задачі</label>
        <select
          value={personeId}
          className={styles.changetask__inputLong}
          id="task"
          onChange={(e) => setPersoneId(e.target.value)}
        >
          <option value="" disabled>
            Оберіть члена сім'ї
          </option>
          {persone &&
            persone.map((persone) => (
              <option key={persone._id} value={persone._id}>
                {persone.name}
              </option>
            ))}
        </select>
        <img
          className={styles.changetask__inputSelect}
          src={select}
          alt="select"
        />
      </div>

      <div
        className={`${styles.changetask__input} ${styles.changetask__inputMod}`}
      >
        <label htmlFor="grade">Бал</label>
        <input
          className={`${styles.changetask__inputLong} ${styles.changetask__inputShort}`}
          id="grade"
          type="number"
          min="1"
          max="99"
          placeholder="--"
          onChange={(e) => setReward(e.target.value)}
        />
        <img className={styles.changetask__inputStar} src={star} alt="star" />
        <label className={styles.label__day} htmlFor="day">
          Дні на виконання (необов'язково)
        </label>
        <input
          className={`${styles.changetask__inputLong} ${styles.changetask__inputShort}`}
          id="day"
          type="number"
          min="0"
          max="99"
          placeholder="--"
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <p style={{ color: 'red', height: '12px', fontWeight: '700' }}>
        {!checkAllInput && 'Заповніть всі поля!'}
      </p>
      <div className={styles.changetask__btns}>
        <button onClick={onClose} className={styles.changetask__button}>
          Відміна
        </button>
        <button
          onClick={handleSave}
          className={`${styles.changetask__button} ${styles.changetask__buttonOrange}`}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  persone: state.persones,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (id, title, reward, time) =>
    dispatch(taskOpeartions.addTask(id, title, reward, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFormTask);
