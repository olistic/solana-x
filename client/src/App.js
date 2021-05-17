import React from 'react';

import AppContext from './context';
import Connection from './components/Connection';

const App = () => (
  <AppContext>
    <Connection />
  </AppContext>
);

export default App;
