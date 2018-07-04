import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Delays loading of page until persisted store is fetched
import { store, persistor, history } from './store';
import App from './containers/app';
import Nothing from './components/nothing';

import 'sanitize.css/sanitize.css';
import './index.css';

render(
  <Provider store={store}>
    <PersistGate loading={<Nothing />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#root')
);
