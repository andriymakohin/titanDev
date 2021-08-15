import React, { useState } from 'react';
import styles from './PersoneTask.module.scss';
import DropDown from './PersoneTaskDropDown';

import girlImage from '../../assets/images/personetask_girl.png';
import boyImage from '../../assets/images/personetask_boy.png';

import taskOperations from '../../redux/operations/tasksOperation';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';
import ChangeTaskForm from '../ChangeTaskForm/ChangeTaskForm';

function PersoneTask({
  onTaskRepeat,
  gender,
  daysToDo,
  reward,
  title,
  id,
  taskCurrent,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isRenderModal, setIsRenderModal] = useState(false);
  console.log('taskCurrent',taskCurrent)

  return (
    <>
      {isRenderModal && (
        <Modal onClose={() => setIsRenderModal(false)}>
          <ChangeTaskForm
            taskCurrent={taskCurrent}
            onClose={() => setIsRenderModal(false)}
          />
        </Modal>
      )}
      <div className={styles.personetask}>
        <div
          onClick={() => {
            setIsFocused(true);
          }}
          className={styles.personetask__dots}
        >
          <div className={styles.personetask__dots_dot}></div>
          <div className={styles.personetask__dots_dot}></div>
          <div className={styles.personetask__dots_dot}></div>
          {isFocused && (
            <DropDown
              OnsetIsRenderModal={setIsRenderModal}
              idTaskCurrent={id}
              mouseLeave={() => {
                setIsFocused(false);
              }}
              className={styles.dropdownActive}
            />
          )}
        </div>
        <div className={styles.personetask__name}>
          <img
            className={styles.personetask__name_img}
            src={gender === 'female' ? girlImage : boyImage}
            alt='genderImg'
          />
          <div className={styles.personetask__name_info}>
            <p className={styles.personetask__name_text}>{title}</p>
            <p className={styles.personetask__name_mark}>{reward}</p>
          </div>
        </div>
        <div className={styles.personetask__info}>
          <div className={styles.personetask__info_time}>
            <p className={styles.personetask__info_time_title}>
              Час на виконання:
            </p>
            <p className={styles.personetask__info_time_value}>{daysToDo} день</p>
          </div>
          <div className={styles.personetask__info_approve}>
            <p className={styles.personetask__info_approve_title}>Повторити</p>
            <div className={styles.personetask__info_approve_buttons}>
              <button
                onClick={() => onTaskRepeat(id)}
                className={styles.personetask__info_approve_buttons_btn}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8247 6.78161H2.98176L5.40476 4.35861C5.74585 4.01752 5.74585 3.46461 5.40476 3.12352C5.06358 2.78234 4.51077 2.78244 4.16959 3.12352L0.255812 7.03749C-0.0852708 7.37858 -0.0852708 7.93149 0.255812 8.27257L4.16959 12.1863C4.34018 12.3569 4.56365 12.4421 4.78713 12.4421C5.0106 12.4421 5.23408 12.3568 5.40467 12.1863C5.74575 11.8453 5.74575 11.2923 5.40467 10.9513L2.98166 8.52826H14.8246C16.7151 8.52826 18.2533 10.0664 18.2533 11.957C18.2533 13.8475 16.7151 15.3856 14.8246 15.3856H7.6204C7.13803 15.3856 6.74707 15.7766 6.74707 16.259C6.74707 16.7413 7.13803 17.1323 7.6204 17.1323H14.8246C17.6782 17.1323 19.9999 14.8106 19.9999 11.957C19.9999 9.1033 17.6783 6.78161 14.8247 6.78161Z"
                    fill="#FF8626"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onTaskRepeat: (taskId) => dispatch(taskOperations.repeatTask(taskId)),
});

export default connect(null, mapDispatchToProps)(PersoneTask);
