'use client';

import { useState } from 'react';

import useProfile from '@/hooks/use-profile';
import Button from './button';
import TextField from './text-field';

export default function ProfileForm() {
  const [name, setName] = useState('');

  const { createProfile } = useProfile();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createProfile(name);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <div className="mt-8 flex w-full">
        <TextField
          className="flex-1"
          onChange={(event) => setName(event.target.value)}
          placeholder="type your name"
          value={name}
        />
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
