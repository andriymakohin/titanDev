import { createReducer } from '@reduxjs/toolkit';
import authActions from '../actions/authActions';
import notifyAction from '../actions/notifyAction';

const initialState = { load: false, message: null };

export const notifyReducer = createReducer(initialState, {
  [authActions.registrationUserSuccess]: (state, _) =>
    (state = {
      load: true,
      message:
        'Вам на пошту був надіслан лист з посиланням на верефікацію, перейдіть будь ласка до пошти котру ви вказали при реєстрації',
    }),
  [authActions.registrationUserError]: (state, _) =>
    (state = {
      load: true,
      message:
        'Упс, щось пішло не так, зверніться будь ласка до служби підтримки, або зарєеструйтесь з іншою електронною поштою',
    }),

  [authActions.loginUserError]: (state, _) =>
    (state = { load: true, message: 'Логін або пароль невірний' }),
  [notifyAction.showNotifyFalse]: (state, _) => (state = initialState),
});
