import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

const log = createLogger({
  collapsed: true,
});

let initialState = {}, store;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction)
  store = createStore(reducer, initialState, applyMiddleware( thunk ) );

/**
 * Only use the DevTools component
 * when in development.
 */
if (!isProduction)
{
  const enhancer = compose(
    applyMiddleware( thunk , log),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  store = createStore(reducer, initialState, enhancer);
  store.subscribe(() => {
    // console.log("store changed ", store.getState())
  })
}

export default store
