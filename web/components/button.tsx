export interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit';
  onClick?: () => void;
}

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button
      className="font-sans-alt h-12 cursor-pointer rounded-none border-none bg-neutral-950 px-8 font-semibold leading-none tracking-wide text-neutral-50 focus:outline-none"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
