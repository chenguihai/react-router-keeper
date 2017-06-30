import './style.css'

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory';
import {Router} from '../src';

import AppReducer from './AppReducers';
import AppMain from './Main';

const history = createHistory()

const store = createStore(AppReducer, compose(applyMiddleware(thunk), window.devToolsExtension
    ? window.devToolsExtension()
    : f => f))

ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
        <AppMain/>
    </Router>
</Provider>, document.getElementById('root'));