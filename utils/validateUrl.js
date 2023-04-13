const regex = /https?:\/\/(www)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?/i;

function validateUrl(url) {
  return regex.test(url);
}

module.exports = {
  regex,
  validateUrl,
};
