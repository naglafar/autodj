const actionNames = require('../constants/actionNames');

const uploadTrack = function () {
  this.dispatch(actionNames.PLAY);
};

module.exports = uploadTrack;
