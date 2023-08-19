export interface DetailHeaderProps {
  children: React.ReactNode;
}

export default function DetailHeader({ children }: DetailHeaderProps) {
  return (
    <header className="mb-2 flex flex-col border-b border-solid border-neutral-200 pb-2">
      {children}
    </header>
  );
}
