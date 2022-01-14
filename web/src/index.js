import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import AppContext from './context';
import Author from './screens/Author';
import Home from './screens/Home';
import NoMatch from './screens/NoMatch';
import Tweet from './screens/Tweet';
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
              <Route path="/authors/:authorId" element={<Author />} />
              <Route path="/tweets/:tweetId" element={<Tweet />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </React.StrictMode>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
