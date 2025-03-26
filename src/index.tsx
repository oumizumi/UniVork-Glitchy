import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import type { Store, AnyAction } from 'redux';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  const StrictProvider = Provider as React.ComponentType<{
    store: Store<unknown, AnyAction>;
    children: React.ReactNode;
  }>;

  root.render(
    <React.StrictMode>
      <StrictProvider store={store}>
        <App />
      </StrictProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
