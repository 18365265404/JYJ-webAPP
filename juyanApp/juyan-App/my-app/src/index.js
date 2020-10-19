import React from 'react';
import ReactDOM from 'react-dom';

// import './assets/js/font';
import './assets/js/index.min';
import './assets/css/base.css';

import {HashRouter,Route} from 'react-router-dom';
import App from './components/App';

import {createStore}  from 'redux';
import {Provider} from 'react-redux';
import defaultState from './store/state'
import reducer from './store/reducer'

let store = createStore(reducer,defaultState); //创建store

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route component={App}/>
    </HashRouter>
  </Provider>
  ,
  document.getElementById('root')
);



import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
