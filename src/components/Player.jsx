const React = require('react');

const Col = require('./Column.jsx'),
  Row = require('./Row.jsx'),
  FluidContainer = require('./FluidContainer.jsx'),
  Track = require('./Track.jsx'),
  Button = require('./Button.jsx');

const flux = require('../flux'),
  storeNames = require('../constants/storeNames');

const fadeTimeSeconds = 2;

const context = new AudioContext();

const Player = React.createClass({

  getInitialState: () => {
    return {
      playing: false,
      trackLoaded: false
    };
  },

  play: function () {
    let audioLoaded = this.state.trackLoaded;

    if (audioLoaded) {
      this.resume();
    } else {
      this.enqueueTrack();
    }
  },

  enqueueTrack: function () {
    let tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      currentTrack = tracks[0],
      that = this;

    Promise.resolve()

      .then(() => {
        console.log('starting playing');
        that.setState({playing: true});
      })

      .then(() => {
        return that.prepTrack(currentTrack);
      })

      .then(({source, gain}) => {
        return that.fadeIn(source, gain);
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
    )
    .then(
      () => {
        that.setState({playing: false});
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
        gain: gain,
        trackLoaded: true
      });
      console.debug('now playing');
      resolve();
    });
  },

  prepTrack: function (track) {
    console.debug('preparing track', track);
    return new Promise((resolve) => {
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
    return new Promise((resolve) => {
      console.debug('fading in');
      const currentTime = context.currentTime;

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

    const currentTime = context.currentTime;

    console.debug('fading out');

    return new Promise((resolve) => {
      gainNode.gain.linearRampToValueAtTime(1, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeTimeSeconds);

      setTimeout(() => {
        console.debug('faded out');
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
    const that = this,
      tracks = flux.store(storeNames.PLAY_LIST).getState().tracks,
      nextTrack = tracks[1];

    let nextSource,
      nextGain;

    Promise.resolve()
    .then(() => {
      return that.prepTrack(nextTrack);
    })
    .then(({source, gain}) => {
      nextSource = source;
      nextGain = gain;
      return that.fadeIn(source, gain);
    })
    .then(() => {
      return that.fadeOut(that.state.source, that.state.gain);
    })
    .then(() => {
      return that.savePlayingTrack(nextSource, nextGain);
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
