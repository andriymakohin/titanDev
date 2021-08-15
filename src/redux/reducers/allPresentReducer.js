import { createReducer } from '@reduxjs/toolkit';
import presentAction from '../actions/presentAction';

const getAllPresents = (state, action) => {
  return (state = action.payload);
};

const newPresent = (state, action) => {
  return [...state, action.payload];
};

const removePresent = (state, action) => {
  return [...state.filter((idPresent) => idPresent._id !== action.payload)];
};

const updatePresent = (state, action) => {
  return [
    ...state.map((el) =>
      el._id === action.payload._id ? (el = action.payload) : el,
    ),
  ];
};

const presents = createReducer([], {
  [presentAction.addPresentSuccess]: newPresent,
  [presentAction.removePresentSuccess]: removePresent,
  [presentAction.updatePresentSuccess]: updatePresent,
  [presentAction.getAllPresentSuccess]: getAllPresents,
});

export default {
  presents,
};
