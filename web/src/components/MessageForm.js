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

function MessageForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(content);

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
