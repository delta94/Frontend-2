import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import DevTools from './config/devtools';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './actions/auth';
import ErrorBoundary from './common/components/ErrorBoundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';
import './assets/base.scss';
import 'antd/dist/antd.css';
import Popup from 'react-popup';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

const store = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    // If you are developing in React 16.6, what has been recommended is to wrap <React.StrictMode> around <App />
    <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        {/* <div> */}
        {/* If this slows down the app in dev disable it and enable when required  */}
        {devTools}
        <Component />
        <Popup />
        {/* </div> */}
      </Provider>
    </ErrorBoundary>
    </React.StrictMode>,
    rootEl
  );

render(AppComponent);
