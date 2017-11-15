import React from 'react';
import ReactDOM from 'react-dom';
import Component from './index';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from 'store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider> ), div);
});
