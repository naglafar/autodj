const Fluxxor = require('fluxxor'),
  uuid = require('uuid');

const actionNames = require('../constants/actionNames');

const PlaylistStore = Fluxxor.createStore({

  initialize: function () {
    this.state = {
      tracks: []
    };

    this.bindActions(
      actionNames.UPLOAD_TRACK, this.dealWithUploadedTrack
    );
  },

  getState: function () {
    return this.state;
  },

  dealWithUploadedTrack: function (uploadedTrack) {

    let track = {
      id: uuid.v1(),
      name: uploadedTrack.name,
      type: uploadedTrack.type,
      analysed: false,
      track: uploadedTrack
    };

    this.state.tracks.push(track);
    this.emit('change');
  }

});

module.exports = PlaylistStore;
