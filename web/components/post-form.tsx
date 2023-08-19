'use client';

import { useState } from 'react';

import usePosts from '@/hooks/use-posts';
import Button from './button';
import TextField from './text-field';

const characterLimit = 280;

export default function PostForm() {
  const [content, setContent] = useState('');

  const { sendPost } = usePosts();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPost(content);

    // Reset form.
    setContent('');
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <TextField
        className="flex-1"
        onChange={(event) => setContent(event.target.value)}
        maxLength={characterLimit}
        placeholder="what's happening?"
        value={content}
      />
      <Button type="submit">Post</Button>
    </form>
  );
}
