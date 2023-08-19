import clsx from 'clsx';

export interface TextFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  maxLength?: number;
  placeholder?: string;
}

export default function TextField({
  className,
  ...otherProps
}: TextFieldProps) {
  return (
    <input
      autoComplete="off"
      className={clsx(
        'h-12 border-b border-solid border-transparent bg-neutral-200 px-4 py-0 font-mono text-neutral-950 focus:border-neutral-950 focus:outline-none',
        className,
      )}
      type="text"
      {...otherProps}
    />
  );
}
