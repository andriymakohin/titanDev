import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import style from './Layout.module.css';

import Slider from '../IformationOnPersone_(sidebar)/InformationList';
import Modal from '../Modal/Modal';
import Header from '../Header';
import AddFormTask from '../AddFormTask';
import tasksOperation from '../../redux/operations/tasksOperation';
import getPersonesOperation from '../../redux/operations/getAllPersones';

class Layout extends Component {
  state = { modal: false, addFromTask: false };

  toggleModal = () => {
    this.setState((state) => ({ modal: !state.modal }));
  };

  toggleAddFormTaskModal = () => {
    this.setState((state) => ({ addFromTask: !state.addFromTask }));
  };

  render() {
    const { addFromTask } = this.state;

    return (
      <div className="container">
        <header className={style.header}>
          <Header></Header>
        </header>

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
              {matches.small && <></>}
              {matches.medium && <></>}
              {matches.large && (
                <div className={style.main}>
                  <div className={style.familynfo}>
                    <Slider onClick={this.toggleModal}></Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
