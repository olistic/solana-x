const now = Math.floor(Date.now() / 1000);

export default [
  {
    author: 'mike',
    timestamp: now,
    content: 'Lorem ipsum dolor sit amet.',
  },
  {
    author: 'sandra',
    timestamp: now - 5 * 60,
    content: 'Hey there! This is a dummy message.',
  },
];
