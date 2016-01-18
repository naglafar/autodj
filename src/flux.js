const Fluxxor = require('fluxxor');

const actions = require('./actions/actions');

const stores = {
};

const flux = new Fluxxor.Flux(stores, actions);

module.exports = flux;

