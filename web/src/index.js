import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppContext from './context';

const Root = () => (
  <AppContext>
    <App />
  </AppContext>
);

ReactDOM.render(<Root />, document.getElementById('root'));
