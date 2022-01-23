import { ProfileProvider } from './ProfileContext';
import { SolanaProvider } from './SolanaContext';
import { TweetsProvider } from './TweetsContext';

export default function AppContext({ children }) {
  return (
    <SolanaProvider>
      <ProfileProvider>
        <TweetsProvider>{children}</TweetsProvider>
      </ProfileProvider>
    </SolanaProvider>
  );
}
