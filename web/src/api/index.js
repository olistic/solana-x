/* eslint-disable import/prefer-default-export */

import Message from '../models/Message';

export const fetchMessages = async ({ program }) => {
  const messages = await program.account.message.all();
  return messages.map(
    (message) => new Message(message.publicKey, message.account),
  );
};
