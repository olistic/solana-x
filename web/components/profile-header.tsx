import { Profile } from '@/lib/models';
import BackButton from './back-button';
import DetailHeader from './detail-header';

export interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <DetailHeader>
      <div className="mb-2 flex items-center">
        <BackButton />
        <h1 className="my-0 ml-2 text-3xl font-semibold leading-tight">
          {profile.name}
        </h1>
      </div>
      <p className="m-0 font-mono text-sm leading-none text-neutral-500">
        {profile.owner.toBase58()}
      </p>
    </DetailHeader>
  );
}
