const React = require('react');

const Col = require('./Column.jsx'),
  Row = require('./Row.jsx'),
  FluidContainer = require('./FluidContainer.jsx'),
  Track = require('./Track.jsx'),
  Button = require('./Button.jsx');

const flux = require('../flux'),
  storeNames = require('../constants/storeNames');

const sources = {
  MAIN_SOURCE: 'main.source',
  NEW_SOURCE: 'next.source'
};

const Player = React.createClass({

  getInitialState: () => {
    return {
      playing: false,
      context: new AudioContext()
    };
  },

  play: function () {
    let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      currentTrack = tracks[0];
    this.playTrack(currentTrack, sources.MAIN_SOURCE);
  },

  pause: function () {
    this.state[sources.MAIN_SOURCE].stop();
    this.state[sources.NEW_SOURCE].stop();
    this.setState({playing: false});
  },

  skip: function () {
    let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      nextTrack = tracks[1];

    // fade in
    this.playTrack(nextTrack, sources.NEW_SOURCE);
    // delay

    // fade out

    this.state[sources.MAIN_SOURCE].stop();
    this.state[sources.MAIN_SOURCE] = this.state[sources.NEW_SOURCE];

    delete this.state[sources.NEW_SOURCE];
  },

  playTrack: function (track, layer) {

    let that = this,
      context = this.state.context;

    context.decodeAudioData(track.arrayBuffer, function(buffer) {
      let source = context.createBufferSource(); // creates a sound source
      source.buffer = buffer;                    // tell the source which sound to play
      source.connect(context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now

      let playingState = {
        playing: true
      };

      playingState[layer] = source;

      that.setState(playingState);
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
            {this.renderPlayOrPause()}
          </Col>
          <Col s={6}>
            <Button gliff="forward" click={this.skip}/>
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
  },

  renderPlayOrPause: function () {
    if (this.state.playing) {
      return (
        <Button gliff="pause" click={this.pause}/>
      );
    }
    return (
      <Button gliff="play" click={this.play}/>
    );
  }
});

module.exports = Player;
