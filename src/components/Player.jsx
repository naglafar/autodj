const React = require('react');

const Col = require('./Column.jsx'),
  Row = require('./Row.jsx'),
  FluidContainer = require('./FluidContainer.jsx'),
  Gliff = require('./Gliff.jsx'),
  Track = require('./Track.jsx');

const flux = require('../flux'),
  storeNames = require('../constants/storeNames');

const Player = React.createClass({
  render: function () {

    let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      currentTrack = tracks[0],
      nextTrack = tracks[1];

    return (
      <FluidContainer>
        <Row>
          {this.renderTrack(currentTrack)}
        </Row>
        <Row>
          {this.renderTrack(nextTrack)}
        </Row>
        <Row>
          <Col s={6}>
            <Gliff gliff="play"/>
          </Col>
          <Col s={6}>
            <Gliff gliff="forward"/>
          </Col>
        </Row>
      </FluidContainer>
    );
  },

  renderTrack: (currentTrack) => {
    if (currentTrack) {
      return (
       <Track track={currentTrack}/>
      );
    }
    return (
      <div><p>Queue Some Tracks!</p></div>
    );
  }
});

module.exports = Player;
