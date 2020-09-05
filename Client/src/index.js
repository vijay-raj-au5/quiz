import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import  {applyMiddleware,createStore} from 'redux'
import {rootReducer} from './Redux/appReducer'
import { logger } from 'redux-logger'
let store = createStore(rootReducer,applyMiddleware(thunk,logger))
ReactDOM.render(
  <Provider store ={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

