/* eslint-disable import/prefer-default-export */

const BASE_URL = 'https://avatars.dicebear.com/api';
const TYPE = 'pixel-art-neutral';

export const getAvatarSrc = (id) => `${BASE_URL}/${TYPE}/${id}.svg`;
