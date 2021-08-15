import getAllComplitedTasksActions from '../actions/getAllComplitedTasks';
import { createReducer } from '@reduxjs/toolkit';

const allTasksCurrentPersone = createReducer(null, {
  [getAllComplitedTasksActions.getAllTasksSuccess]: (state, action) =>
    (state = action.payload),
});

export default {
  allTasksCurrentPersone,
};
