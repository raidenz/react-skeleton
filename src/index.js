import React from 'react';
import ReactDOM from 'react-dom';
import App from 'container/App';
import {BrowserRouter} from 'react-router-dom'

import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import store from 'store';

import { AuthHelper } from './utils/auth';
import { setAccount } from 'actions';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

if (AuthHelper.isLoggedIn()) {
  store.dispatch(setAccount(AuthHelper.getUserData()));
}

ReactDOM.render((
  <Provider store={store}>
  	<BrowserRouter>
  		<App />
  	</BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
