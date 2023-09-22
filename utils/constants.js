const resTemplate = (data, obj) => ({
  _id: data._id,
  email: obj.email,
  name: obj.name,
  about: obj.about,
  avatar: obj.avatar,
});

const regexLink = /^https?:\/\/(www)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%]+#?$/;

module.exports = {
  resTemplate,
  regexLink,
};
