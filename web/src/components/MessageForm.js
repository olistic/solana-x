import React, { useState } from 'react';

import Button from './Button';
import TextField from './TextField';
import { styled } from '../stitches.config';

const StyledForm = styled('form', {
  display: 'flex',
});

const StyledTextField = styled(TextField, {
  flex: 1,
});

function MessageForm({ onMessagePost }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newMessage = {
      author: 'john',
      content,
      createdAt: new Date(),
    };
    await onMessagePost(newMessage);

    // Reset form.
    setContent('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextField
        onChange={(event) => setContent(event.target.value)}
        placeholder="type your message"
        value={content}
      />
      <Button>Post</Button>
    </StyledForm>
  );
}

export default MessageForm;
