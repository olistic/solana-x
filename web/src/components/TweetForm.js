import React, { useState } from 'react';

import Button from './Button';
import TextField from './TextField';
import { styled } from '../stitches.config';

const CHARACTER_LIMIT = 280;

const StyledForm = styled('form', {
  display: 'flex',
});

const StyledTextField = styled(TextField, {
  flex: 1,
});

function TweetForm({ onSubmit }) {
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
        maxLength={CHARACTER_LIMIT}
        placeholder="what's happening?"
        value={content}
      />
      <Button>Tweet</Button>
    </StyledForm>
  );
}

export default TweetForm;
