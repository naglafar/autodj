const actionNames = require('../constants/actionNames');

const uploadTrack = function (source, gain, trackLoaded) {
  this.dispatch(actionNames.TRACK_PLAYING, {source: source, gain: gain, trackLoaded: trackLoaded});
};

module.exports = uploadTrack;
