import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store, persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie';

import { BrowserRouter } from 'react-router-dom';
/* font Rubik */
import './components/AddPersoneForm/AddPersoneFont.module.css';

/* Style normalize */
import './assets/normalize.css';

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
);
