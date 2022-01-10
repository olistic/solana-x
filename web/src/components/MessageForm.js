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

function MessageForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTextField
        onChange={(event) => setMessage(event.target.value)}
        placeholder="type your message"
        value={message}
      />
      <Button>Post</Button>
    </StyledForm>
  );
}

export default MessageForm;
