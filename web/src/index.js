import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import AppContext from './context';
import globalStyles from './globalStyles';

function Root() {
  globalStyles();

  return (
    <React.StrictMode>
      <AppContext>
        <App />
      </AppContext>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
