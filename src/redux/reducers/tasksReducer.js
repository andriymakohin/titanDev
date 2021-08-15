import { createReducer } from '@reduxjs/toolkit';
import tasksAction from '../actions/tasksAction';

const getTasks = (state, action) => {
  return action.payload;
};

const changeConfirmTask = (state, action) => {
  state.map((task) => {
    if (action.payload.id === task._id) {
      task.isCompleted = 'done';
      return task;
    }
    return task;
  });
};
const changeNotConfirmTask = (state, action) => {
  state.map((task) => {
    if (action.payload === task._id) {
      task.isCompleted = 'undone';
      return task;
    }
    return task;
  });
};

const tasks = createReducer([], {
  [tasksAction.getAllTasksSuccess]: getTasks,
  [tasksAction.confirmTaskSuccess]: changeConfirmTask,
  [tasksAction.notconfirmTaskRequest]: changeNotConfirmTask,
  [tasksAction.deleteTaskSuccess]: (state, action) =>
    state.filter((task) => {
      return task._id !== action.payload;
    }),
  [tasksAction.addTaskSuccess]: (state, action) => {
    return [...state, action.payload];
  },
  [tasksAction.repeatTaskSuccess]: (state, action) => {
    state.map((task) => {
      if (action.payload === task._id) {
        task.isCompleted = 'active';
        return task;
      }
      return task;
    });
  },
  [tasksAction.updateTaskSuccess]: (state, action) => {
    return state.map((task) =>
      task._id === action.payload._id ? action.payload : task,
    );
  },
});

export default {
  tasks,
};
