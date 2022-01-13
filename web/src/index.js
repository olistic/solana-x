import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import AppContext from './context';
import Home from './screens/Home';
import globalStyles from './globalStyles';

function Root() {
  globalStyles();

  return (
    <React.StrictMode>
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
