import md5 from 'md5';

export const gravatarImgUrl = (email, size = 50) => {
  return `https://www.gravatar.com/avatar/${md5(email)}?s=${size}`
}
