import addPersoneActions from '../../components/AddPersoneForm/AddPersoneActions';
import getPersonesActions from '../actions/getAllPersones';
import { createReducer } from '@reduxjs/toolkit';

import presentAction from '../actions/presentAction';

import tasksAction from '../actions/tasksAction';

const persones = createReducer([], {
  [addPersoneActions.addPersoneSuccess]: (state, action) => [
    ...state,
    { ...action.payload, _id: action.payload.id },
  ],

  [getPersonesActions.getAllPersonesSuccess]: (state, action) =>
    (state = action.payload),

  [presentAction.buyPresentSuccess]: (state, action) => {
    state.map((persone) => {
      if (persone._id === action.payload.personeId) {
        return (persone.stars =
          persone.stars >= action.payload.newReward
            ? Number(persone.stars) - action.payload.newReward
            : persone.stars);
      }
    });
  },

  [tasksAction.confirmTaskSuccess]: (state, action) => {
    state.map((persone) => {
      if (persone._id === action.payload.personeId) {
        return (persone.stars = Number(persone.stars) + action.payload.reward);
      }
    });
  },
});

export default {
  persones,
};
