import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';

import Slider from '../IformationOnPersone_(sidebar)/InformationList';
import InformationByTask from '../InformationByTask';
import './MainPage.css';
import trStyle from './mainStyles.module.css';
import Modal from '../Modal/Modal';
import task from '../../assets/images/tasks.png';
import AddFormTask from '../AddFormTask';
import tasksOperation from '../../redux/operations/tasksOperation';
import getPersonesOperation from '../../redux/operations/getAllPersones';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class MainPosition extends Component {
  state = { modal: false, addFromTask: false };

  componentDidMount() {
    this.props.getPersones();
    this.props.getTasks();
  }

  toggleModal = () => {
    this.setState((state) => ({ modal: !state.modal }));
  };

  toggleAddFormTaskModal = () => {
    this.setState((state) => ({ addFromTask: !state.addFromTask }));
  };

  render() {
    const { addFromTask } = this.state;
    const { tasks } = this.props;

    return (
      <div className="container">

        {addFromTask && (
          <Modal onClose={this.toggleAddFormTaskModal}>
            <AddFormTask onClose={this.toggleAddFormTaskModal}></AddFormTask>
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
                <div className="familynfo">
                  <Slider onClick={this.toggleModal}></Slider>
                </div>
              )}
              {matches.medium && (
                <div className="familynfo">
                  <Slider onClick={this.toggleModal}></Slider>
                </div>
              )}
              {matches.large && (
                <div className="main">
                  <div className="familynfo"></div>
                  <div className="taskedsInfo">
                    <div className="extendMain">
                      <div className="tasksinfo">
                        <div className="tasksinfo__header">
                          <img className="tasksinfo__header-img" src={task} alt="tastImg" />
                          <h2 className="tasksinfo__header-title">Задачі</h2>
                        </div>
                        <div className="tasksinfo__list">
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
                        <div className="tasksinfo__button">
                          <button
                            onClick={this.toggleAddFormTaskModal}
                            className="tasksinfo__button-button"
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
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  getTasks: tasksOperation.getAllTasks,
  getPersones: getPersonesOperation.getPersones,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPosition);
// export default MainPosition;
