import React, { Component } from 'react';
import avaBoy from '../../assets/images/personetask_boy.png';
import avaGirl from '../../assets/images/personetask_girl.png';
import styles from './InformationByTask.module.css';
import stylingStar from './../../assets/images/Star11.svg';
import iconconfirm from './../../assets/images/confirm.svg';
import iconcross from './../../assets/images/cross.svg';
import Modal from '../Modal/Modal';
import ChangeTaskForm from '../ChangeTaskForm/ChangeTaskForm';
import tasksOperation from '../../redux/operations/tasksOperation';
import { connect } from 'react-redux';

class InformationByTask extends Component {
  state = {
    isRenderModal: false,
    isRenderSubmenu: false,
  };

  handleOpenSubmenu = (e) => {
    this.setState({ isRenderSubmenu: true });
  };
  handleCloseSubmenu = (e) => {
    this.setState({ isRenderSubmenu: false });
  };
  handleOpenModal = (e) => {
    this.setState({ isRenderModal: true, isRenderSubmenu: false });
  };
  handleCloseModal = (e) => {
    this.setState({ isRenderModal: false });
  };
  render() {
    const { isRenderModal, isRenderSubmenu } = this.state;
    const { title, reward, daysToDo } = this.props.task;

    const { gender } = this.props.persone.find(
      (persone) => persone._id === this.props.task.personeId,
    );

    return (
      <>
        <div className={styles.container}>
          <span className={styles.firstSmallContainer}>
            <span className={styles.personePhotoContainer}>
              <img
                src={gender === 'male' ? avaBoy : avaGirl}
                alt="ava"
                className={styles.userPhoto}
              />
            </span>
            <span className={styles.taskNameAndCostContainer}>
              <p className={styles.taskName}>{title}</p>
              <span className={styles.costContainer}>
                <img
                  src={stylingStar}
                  alt="styling-star"
                  className={styles.taskCostStar}
                />
                <p className={styles.taskCostText}>{reward}</p>
              </span>
            </span>
          </span>
          <span className={styles.secondSmallContainer}>
            <span className={styles.timeContainer}>
              <p className={styles.greyTitle}>Час на виконання:</p>
              <p className={styles.taskDayText}>{daysToDo} день(-ів)</p>
            </span>
            <span>
              <p className={styles.greyTitle}>Підтвердження</p>
              <span className={styles.confirmationContainer}>
                <button
                  className={styles.confirmationButton}
                  onClick={this.props.onConfirmTask}
                >
                  <img src={iconconfirm} alt={'pic'}></img>
                </button>
                <button
                  className={styles.confirmationButton}
                  onClick={this.props.onNotConfirmTask}
                >
                  <img src={iconcross} alt={'pic'}></img>
                </button>
              </span>
            </span>
          </span>
          <button
            className={styles.additionButton}
            onFocus={this.handleOpenSubmenu}
          >
            <sup className={styles.idx}>...</sup>
          </button>
          {isRenderSubmenu && (
            <div
              ref={this.submenu}
              className={styles.modalmini}
              onMouseLeave={this.handleCloseSubmenu}
            >
              <button
                className={styles.btn__modal}
                onClick={this.handleOpenModal}
              >
                Редагувати
              </button>
              <button
                onClick={this.props.onDelete}
                className={styles.btn__modal}
              >
                Видалити
              </button>
            </div>
          )}
        </div>
        {isRenderModal && (
          <Modal onClose={this.handleCloseModal}>
            <ChangeTaskForm
              taskCurrent={this.props.task}
              onClose={this.handleCloseModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onConfirmTask: () =>
    dispatch(
      tasksOperation.сonfirmTask(
        ownProps.task._id,
        ownProps.task.reward,
        ownProps.task.personeId,
      ),
    ),
  onNotConfirmTask: () =>
    dispatch(tasksOperation.notConfirmTask(ownProps.task._id)),
  onDelete: () => dispatch(tasksOperation.deleteTask(ownProps.task._id)),
});

export default connect(
  (state) => ({ persone: state.persones }),
  mapDispatchToProps,
)(InformationByTask);
