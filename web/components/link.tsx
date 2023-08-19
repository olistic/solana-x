import NextLink from 'next/link';

export default function Link(props: React.ComponentProps<typeof NextLink>) {
  return (
    <NextLink
      {...props}
      className="text-inherit no-underline hover:underline"
    />
  );
}
