const Fluxxor = require('fluxxor');

const actions = require('./actions/actions');

const PlaylistStore = require('./stores/Playlist');

const stores = {
  playlist: new PlaylistStore()
};

const flux = new Fluxxor.Flux(stores, actions);

module.exports = flux;

