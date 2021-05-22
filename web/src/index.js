import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppContext from './context';

const Root = () => (
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById('root'));
