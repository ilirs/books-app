import React from 'react';
import AppRouter from './routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
      <AppRouter />
    </Provider>
  );
}

export default App;