'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className="group h-8 w-8 cursor-pointer border-none p-0 focus:outline-none"
      onClick={() => router.back()}
      type="button"
    >
      <span className="relative -top-[4px] inline-block translate-x-0 text-3xl leading-none transition-transform group-hover:-translate-x-1">
        ⟵
      </span>
    </button>
  );
}
