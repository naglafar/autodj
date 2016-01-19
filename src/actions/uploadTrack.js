const actionNames = require('../constants/actionNames');

const uploadTrack = function (track) {
  this.dispatch(actionNames.UPLOAD_TRACK, track);
};

module.exports = uploadTrack;
