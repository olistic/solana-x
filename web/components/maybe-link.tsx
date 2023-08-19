'use client';

import { usePathname } from 'next/navigation';

import Link from './link';

export default function MaybeLink({
  children,
  href,
  ...otherProps
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const match = pathname === href;
  if (match) {
    return children;
  }

  return (
    <Link href={href} {...otherProps}>
      {children}
    </Link>
  );
}
