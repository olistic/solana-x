import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import { styled } from './stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const ScrollableContainer = styled('div', {
  flex: 1,
  overflowY: 'auto',
});

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  margin: '$4 auto 0',
  maxWidth: '480px',
  width: '100%',
});

function App() {
  return (
    <Container>
      <Header />
      <ScrollableContainer>
        <Main>
          <Outlet />
        </Main>
      </ScrollableContainer>
    </Container>
  );
}

export default App;
