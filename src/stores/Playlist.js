const Fluxxor = require('fluxxor'),
  uuid = require('uuid');

const actionNames = require('../constants/actionNames'),
  beatDetector = require('./beatDetector');

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

    let that = this;

    let reader = new FileReader();

    Promise
      .resolve()

      .then(() => {
        return new Promise((resolve) => {
          console.log('adding track');
          this.state.tracks.push(track);
          this.emit('change');
          resolve();
        });
      })

      .then(() => {
        return new Promise((resolve, reject) => {
          console.log('reading uploaded file');
          reader.onload = function(event) {
            console.log('loaded file');
            resolve(event);
          };

          reader.onerror = function(event) {
            console.log('failed to load file');
            reject(event);
          };

          reader.readAsArrayBuffer(uploadedTrack);
        });
      })

      .then((fileReadEvent) => {
        return new Promise((resolve) => {
          console.log('crunching bpm', fileReadEvent);
          var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
          var offlineContext = new OfflineContext(1, 2, 44100);

          track.arrayBuffer = fileReadEvent.target.result;

          offlineContext.decodeAudioData(fileReadEvent.target.result, function (buffer) {

            // Create buffer source
            var source = offlineContext.createBufferSource();
            source.buffer = buffer;

            // Create filter
            var filter = offlineContext.createBiquadFilter();
            filter.type = 'lowpass';

            // Pipe the song into the filter, and the filter into the offline context
            source.connect(filter);
            filter.connect(offlineContext.destination);

            // Schedule the song to start playing at time:0
            source.start(0);

            var peaks,
              initialThresold = 0.9,
              thresold = initialThresold,
              minThresold = 0.3,
              minPeaks = 30;

            do {
              peaks = beatDetector.getPeaksAtThreshold(buffer.getChannelData(0), thresold);
              thresold -= 0.05;
            } while (peaks.length < minPeaks && thresold >= minThresold);


            var intervals = beatDetector.countIntervalsBetweenNearbyPeaks(peaks);

            var groups = beatDetector.groupNeighborsByTempo(intervals, buffer.sampleRate);

            var top = groups.sort(function (intA, intB) {
              return intB.count - intA.count;
            }).splice(0, 5);

            track.peaks = peaks;
            track.analysed = true;
            track.bpm = top[0].tempo;
            track.bufferLength = buffer.length;
            resolve();
          });
        });
      })

      .catch((error) => {
        return console.error('failed to bpm match the file', error);
      })

      .then(() => {
        console.log('done analysis');
        that.emit('change');
      });
  }
});

module.exports = PlaylistStore;
