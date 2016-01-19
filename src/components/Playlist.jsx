const React = require('react');

const flux = require('../flux');

const Dropzone = require('react-dropzone'),
  FluidContainer = require('./FluidContainer.jsx'),
  Row = require('./Row.jsx'),
  Tracks = require('./Tracks.jsx');

const Playlist = React.createClass({

  onDrop: function (files) {
    console.log(files);
    flux.actions.uploadTrack(files[0]);
  },

  render: function () {
    return (
      <div className="playlist">
        <FluidContainer>
          <Row>
            <Dropzone className="upload" onDrop={this.onDrop} multiple={false}>
              <span className="upload-txt">Drop Tracks here, or click to select tracks from your file system</span>
            </Dropzone>
          </Row>
          <Row>
            <Tracks/>
          </Row>
        </FluidContainer>
      </div>
    );
  }
});

module.exports = Playlist;
