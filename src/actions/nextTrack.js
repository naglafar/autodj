const actionNames = require('../constants/actionNames');

const uploadTrack = function () {
  this.dispatch(actionNames.NEXT_TRACK);
};

module.exports = uploadTrack;
