import { useState } from 'react';

import Button from './Button';
import TextField from './TextField';
import { styled } from '../stitches.config';

const StyledForm = styled('form', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

const Wrapper = styled('div', {
  display: 'flex',
  marginTop: '$4',
  width: '100%',
});

const StyledTextField = styled(TextField, {
  flex: 1,
});

export default function ProfileForm({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(name);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Wrapper>
        <StyledTextField
          onChange={(event) => setName(event.target.value)}
          placeholder="type your name"
          value={name}
        />
        <Button>Submit</Button>
      </Wrapper>
    </StyledForm>
  );
}
