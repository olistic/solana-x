import AppContext from '../context';
import globalStyles from '../styles/global';

import Header from '../components/Header';
import { styled } from '../stitches.config';

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
  marginX: 'auto',
  maxWidth: '480px',
  paddingTop: '$4',
  width: '100%',
});

export default function App({ Component, pageProps }) {
  globalStyles();

  return (
    <AppContext>
      <Container>
        <Header />
        <ScrollableContainer>
          <Main>
            <Component {...pageProps} />
          </Main>
        </ScrollableContainer>
      </Container>
    </AppContext>
  );
}
