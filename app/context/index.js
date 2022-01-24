import dynamic from 'next/dynamic';

import { ProfileProvider } from './ProfileContext';
import { TweetsProvider } from './TweetsContext';

const SolanaProvider = dynamic(
  () => import('./SolanaContext').then(({ SolanaProvider }) => SolanaProvider),
  { ssr: false },
);

export default function AppContext({ children }) {
  return (
    <SolanaProvider>
      <ProfileProvider>
        <TweetsProvider>{children}</TweetsProvider>
      </ProfileProvider>
    </SolanaProvider>
  );
}
