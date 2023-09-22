const resTemplate = (data) => ({
  _id: data._id,
  email: data.email,
  name: data.name,
  about: data.about,
  avatar: data.avatar,
});

const regexLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

module.exports = {
  resTemplate,
  regexLink,
};
