const actionNames = require('../constants/actionNames');

const uploadTrack = function () {
  this.dispatch(actionNames.PAUSE);
};

module.exports = uploadTrack;
