// import React, { useState, useEffect, Fragment } from 'react';
import task from '../../assets/images/tasks.png';
import Media from 'react-media';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useDementions from './useDementions';
import { connect } from 'react-redux';
import AddFormTask from '../AddFormTask';

import InformationByTask from '../InformationByTask';
import Modal from '../Modal/Modal';

// import tasksOperation from '../../redux/operations/tasksOperation';
// import getPersonesOperation from '../../redux/operations/getAllPersones';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import taskStyles from './index.module.css';
import trStyle from './trStyle.module.css';

function TasksPage({ tasks }) {
  const [taskModal, setTaskModal] = useState(false);

  const history = useHistory();
  const { width } = useDementions();

  useEffect(() => {
    width > 1250 && history.push('/main');
  });
  return (
    <>
      <div className={taskStyles.container}>
        {taskModal && (
          <Modal onClose={() => setTaskModal(false)}>
            <AddFormTask onClose={() => setTaskModal(false)} />
          </Modal>
        )}

        <Media
          queries={{
            small: '(max-width: 767px)',
            medium: '(min-width: 768px) and (max-width: 1250px)',
            large: '(min-width: 1250px)',
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.small && (
                <div className={taskStyles.familynfo}>
                  <div className={taskStyles.familynfo}>
                    <div className={taskStyles.taskedsInfo}>
                      <div className={taskStyles.extendMain}>
                        <div className={taskStyles.tasksinfo}>
                          <div className={taskStyles.tasksinfo__header}>
                            <img
                              className={taskStyles.tasksinfo__header_img}
                              src={task}
                              alt="taskImg"
                            />
                            <h2 className={taskStyles.tasksinfo__header_title}>
                              Задачі
                            </h2>
                          </div>
                          <div className={taskStyles.tasksinfo__list}>
                            {tasks && (
                              <TransitionGroup
                                component="ul"
                                className={trStyle}
                              >
                                {tasks.map(
                                  (task) =>
                                    task.isCompleted === 'active' && (
                                      <CSSTransition
                                        in={true}
                                        appear={true}
                                        classNames={trStyle}
                                        key={task._id}
                                        timeout={250}
                                        unmountOnExit
                                      >
                                        <InformationByTask
                                          key={task._id}
                                          task={task}
                                        />
                                      </CSSTransition>
                                    ),
                                )}
                              </TransitionGroup>
                            )}
                          </div>
                          <div className={taskStyles.tasksinfo__button}>
                            <button
                              onClick={() => setTaskModal(true)}
                              className={taskStyles.tasksinfo__button_button}
                            >
                              Додати задачу +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {matches.medium && (
                <div className={taskStyles.familynfo}>
                  <div className={taskStyles.taskedsInfo}>
                    <div className={taskStyles.extendMain}>
                      <div className={taskStyles.tasksinfo}>
                        <div className={taskStyles.tasksinfo__header}>
                          <img
                            className={taskStyles.tasksinfo__header_img}
                            src={task}
                            alt="taskImg"
                          />
                          <h2 className={taskStyles.tasksinfo__header_title}>
                            Задачі
                          </h2>
                        </div>
                        <div className={taskStyles.tasksinfo__list}>
                          {tasks && (
                            <TransitionGroup component="ul" className={trStyle}>
                              {tasks.map(
                                (task) =>
                                  task.isCompleted === 'active' && (
                                    <CSSTransition
                                      in={true}
                                      appear={true}
                                      classNames={trStyle}
                                      key={task._id}
                                      timeout={250}
                                      unmountOnExit
                                    >
                                      <InformationByTask
                                        key={task._id}
                                        task={task}
                                      />
                                    </CSSTransition>
                                  ),
                              )}
                            </TransitionGroup>
                          )}
                        </div>
                        <div className={taskStyles.tasksinfo__button}>
                          <button
                            onClick={() => setTaskModal(true)}
                            className={taskStyles.tasksinfo__button_button}
                          >
                            Додати задачу +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </Media>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.tasks
});

export default connect(mapStateToProps)(TasksPage);
