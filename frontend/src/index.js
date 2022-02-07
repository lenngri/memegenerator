import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider, createStore } from 'easy-peasy';
import model from './model';
import { Auth0Provider } from '@auth0/auth0-react';

const store = createStore(model);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ttc1u0sj.us.auth0.com"
      clientId="4J1oZzOgZnhQhNzmoFWjXmZezUcRhuZ5"
      redirectUri={window.location.origin}
    >
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
