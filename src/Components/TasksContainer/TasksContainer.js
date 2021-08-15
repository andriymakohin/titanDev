import React from 'react';
import PersoneTask from '../PersoneTask';
import maleImage from '../../assets/InformationOnPersone-Images/image15.svg';
import femaleImage from '../../assets/InformationOnPersone-Images/image14.svg';
import getAllTasksSelector from '../../redux/selectors/allTasksCurrentPersoneSelector';
import { connect } from 'react-redux';
import style from './tasksContainer.module.css';
import trStyles from './trStyles.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TasksContainer = ({ match, allTasks, tasks, location }) => {
  const currentPersoneTasks = () => {
    return [...tasks].filter(
      (task) =>
        task.personeId === location.state.personeId &&
        task.isCompleted !== 'active',
    );
  };

  return (
    <div className={style.tasksContainer_container}>
      <div className={style.tasksContainer_header}>
        <img
          className={style.tasksContainer_genderImage}
          src={match.params.gender === 'male' ? maleImage : femaleImage}
          alt='genderImg'
        ></img>
        <p className={style.tasksContainer_name}>{match.params.name}</p>
      </div>
      <div className={style.tasksContainer_allTasks}>
        {currentPersoneTasks().length > 0 ? (
          <TransitionGroup component="ul" >
          {currentPersoneTasks().map((task) => (
            <CSSTransition in={true} appear={true} timeout={300} classNames={trStyles} key={task._id} unmountOnExit>
              <li key={task._id}>
            <PersoneTask
              key={task._id}
              id={task._id}
              gender={match.params.gender}
              daysToDo={task.daysToDo}
              reward={task.reward}
              title={task.title}
              taskCurrent={task}
            />
            </li>
            </CSSTransition>
            
          ))}</TransitionGroup>) : (
          <p className={style.tasksContainer_alternative}>
            Немає виконаних задач
          </p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allTasks: getAllTasksSelector.getAllTasksCurrentPersoneren(state),
  tasks: state.tasks,
});

export default connect(mapStateToProps, null)(TasksContainer);
