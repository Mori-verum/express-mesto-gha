const regex = /https?:\/\/(www)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?/i;

function validateUrl(url) {
  if (regex.test(url)) {
    return url;
  }
  throw new Error('Ссылка должна быть валидной');
}

module.exports = {
  regex,
  validateUrl,
};
