import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { theme } from './utils/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          {/* <Paper> */}
          <App />
          {/* </Paper> */}
        </React.Fragment>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
