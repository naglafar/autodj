const Fluxxor = require('fluxxor');
const LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = {
  storeWatch: Fluxxor.StoreWatchMixin,
  LinkedStateMixin: LinkedStateMixin
};
