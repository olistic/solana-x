import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppContext from './context';
import './globalStyles';

function Root() {
  return (
    <React.StrictMode>
      <AppContext>
        <App />
      </AppContext>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
