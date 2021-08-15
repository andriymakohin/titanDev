import React from 'react';

import styles from '../InformationByTask/InformationByTask.module.css';
import tasksOperation from '../../redux/operations/tasksOperation';
import { connect } from 'react-redux';

function PersoneTaskDropDown({
  mouseLeave,
  OnsetIsRenderModal,
  idTaskCurrent,
  deleteTask,
}) {
  return (
    <div>
      <div
        className={styles.modalmini}
        style={{ zIndex: 12, top: '10px', right: '6px' }}
        onMouseLeave={mouseLeave}
      >
        <button
          className={styles.btn__modal}
          onClick={() => {
            mouseLeave();
            OnsetIsRenderModal(true);
          }}
        >
          Редагувати
        </button>
        <button
          onClick={() => {
            deleteTask(idTaskCurrent);
          }}
          className={styles.btn__modal}
        >
          Видалити
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = { deleteTask: tasksOperation.deleteTask };

export default connect(null, mapDispatchToProps)(PersoneTaskDropDown);
