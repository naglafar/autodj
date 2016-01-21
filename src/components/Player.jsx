const React = require('react');

const Col = require('./Column.jsx'),
  Row = require('./Row.jsx'),
  FluidContainer = require('./FluidContainer.jsx'),
  Track = require('./Track.jsx'),
  Button = require('./Button.jsx');

const flux = require('../flux'),
  storeNames = require('../constants/storeNames');

const fadeTimeSeconds = 2;

const Player = React.createClass({

  getInitialState: () => {
    return {
      playing: false,
      trackLoaded: false,
      context: new AudioContext()
    };
  },

  play: function () {
    let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      currentTrack = tracks[0],
      that = this;

    Promise.resolve()

    .then(
      () => {
        console.log('starting playing');
        that.setState({playing: true});
      }
    )

    .then(() => {
      return that.prepTrack(currentTrack);
    })

    .then(({source, gain}) => {
      return that.fadeIn(source, gain, 0);
    })

    .then(({source, gain}) => {
      return that.savePlayingTrack(source, gain);
    });
  },

  pause: function () {
    let that = this,
      source = this.state.source,
      gain = this.state.gain;

    Promise.resolve()
    .then(
      () => {
        return that.fadeOut(source, gain);
      }
    );
  },

  resume: function () {

  },

  savePlayingTrack: function (source, gain) {
    const that = this;
    return new Promise((resolve) => {
      that.setState({
        source: source,
        gain: gain
      });
      console.debug('now playing');
      resolve();
    });
  },

  prepTrack: function (track) {
    const that = this;
    console.debug('preparing track', track);
    return new Promise((resolve) => {
      const context = that.state.context;
      context.decodeAudioData(track.arrayBuffer, function (buffer) {
        let source = context.createBufferSource();
        let gainNode = context.createGain();
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(context.destination);
        console.log('track prepared', track);
        resolve({source: source, gain: gainNode});
      });
    });
  },

  fadeIn: function (source, gainNode) {
    const that = this;
    return new Promise((resolve) => {
      console.debug('fading in');
      const context = that.state.context,
        currentTime = context.currentTime;

      gainNode.gain.linearRampToValueAtTime(0, currentTime);
      gainNode.gain.linearRampToValueAtTime(1, currentTime + fadeTimeSeconds);

      source.start(0);

      setTimeout(() => {
        console.debug('faded track in');
        resolve({source: source, gain: gainNode});
      },
      fadeTimeSeconds * 1000
      );
    });
  },

  fadeOut: function (source, gainNode) {

    const context = this.state.context,
      currentTime = context.currentTime;

    return new Promise((resolve) => {
      gainNode.gain.linearRampToValueAtTime(1, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeTimeSeconds);

      setTimeout(() => {
        source.stop();
        resolve();
      },
        fadeTimeSeconds * 1000
      );
    });
  },

  moveTheQueueAlongOne: function () {

  },

  skip: function () {
   /* let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      nextTrack = tracks[1];

    // fade in
    this.playTrack(nextTrack, sources.NEW_SOURCE);
    // delay

    // fade out

    this.state[sources.MAIN_SOURCE].stop();
    this.state[sources.MAIN_SOURCE] = this.state[sources.NEW_SOURCE];

    delete this.state[sources.NEW_SOURCE];*/
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
