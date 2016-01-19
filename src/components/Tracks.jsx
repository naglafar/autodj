const React = require('react');

const flux = require('../flux'),
  mixins = require('./mixins'),
  storeNames = require('../constants/storeNames');

const Row = require('./Row.jsx'),
  Track = require('./Track.jsx');

const Tracks = React.createClass({

  mixins: [mixins.storeWatch(storeNames.PLAY_LIST)],

  getDefaultProps: function () {
    return {
      flux: flux
    };
  },

  getStateFromFlux: function () {
    return flux.store(storeNames.PLAY_LIST).getState();
  },

  render: function () {
    return (
      <div className="tracks">
        <Row>
          <h1>Current Playlist</h1>
        </Row>
        <Row>
          <ol>
          {
            this.state.tracks.map(this.renderTrack)
          }
          </ol>
        </Row>
      </div>
    );
  },

  renderTrack: (track) => (
    <li key={track.id}>
      <Track track={track}/>
    </li>
  )
});

module.exports = Tracks;
