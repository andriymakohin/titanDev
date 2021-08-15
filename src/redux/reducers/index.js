import { loaderReducer } from './laoderReducer';
import { notifyReducer } from './notifyReducer';
import addPersoneReducer from './addPersoneReducer';
import allPresentReducer from './allPresentReducer';
import AllTasksCurrentPersone from './allTasksCurrentPersone';
import { authReducer } from './authReducer';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import tasksReducer from './tasksReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
    loader: loaderReducer,
    persones: addPersoneReducer.persones,
    presents: allPresentReducer.presents,
    currentPersoneTasks: AllTasksCurrentPersone.allTasksCurrentPersone,
    tasks: tasksReducer.tasks,
    user: persistReducer(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
