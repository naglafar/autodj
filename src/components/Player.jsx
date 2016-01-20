const React = require('react');

const Col = require('./Column.jsx'),
  Row = require('./Row.jsx'),
  FluidContainer = require('./FluidContainer.jsx'),
  Gliff = require('./Gliff.jsx'),
  Track = require('./Track.jsx'),
  Button = require('./Button.jsx');

const flux = require('../flux'),
  storeNames = require('../constants/storeNames');

const context = new AudioContext();

const Player = React.createClass({

  play: function () {
    let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      currentTrack = tracks[0];

    context.decodeAudioData(currentTrack.arrayBuffer, function(buffer) {
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = buffer;                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now

      this.setState({playing: true});
    });
  },

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
            <Button gliff="play" click={this.play}/>
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
