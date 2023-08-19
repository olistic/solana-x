import { PostsProvider } from './posts';
import { ProfileProvider } from './profile';
import { SolanaProvider } from './solana';

export interface AppContextProps {
  children: React.ReactNode;
}

export default function AppContext({ children }: AppContextProps) {
  return (
    <SolanaProvider>
      <ProfileProvider>
        <PostsProvider>{children}</PostsProvider>
      </ProfileProvider>
    </SolanaProvider>
  );
}
