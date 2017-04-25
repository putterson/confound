import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ConfoundApp from './components/ConfoundApp.jsx';
import confoundApp from './reducers'

console.log("Confound entry point.")
require("./main.css")

let store = createStore(
    confoundApp,
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <ConfoundApp />
    </Provider>
, document.getElementById('root'));