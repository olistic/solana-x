import { useRouter } from 'next/router';

import Link from './Link';

export default function MaybeLink({ children, href }) {
  const { asPath } = useRouter();
  const match = asPath === href;

  if (match) {
    return children;
  }

  return <Link href={href}>{children}</Link>;
}
