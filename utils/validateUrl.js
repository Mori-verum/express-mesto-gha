const regex = /https?:\/\/(www)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?/i;

function isUrl(url) {
  return regex.test(url);
}

module.exports = {
  regex,
  isUrl,
};
