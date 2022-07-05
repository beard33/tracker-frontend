import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import 'normalize.css/normalize.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import setup from './services/setupInterceptors'
import App from "./App";



ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);
setup(store);

