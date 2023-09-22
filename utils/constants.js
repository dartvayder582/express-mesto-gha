const resTemplate = (data) => ({
  _id: data._id,
  email: data.email,
  name: data.name,
  about: data.about,
  avatar: data.avatar,
});

const regexLink = /^https?:\/\/(www)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%]+#?$/;

module.exports = {
  resTemplate,
  regexLink,
};
