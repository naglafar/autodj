const React = require('react');

const Row = require('./Row.jsx'),
  Col = require('./Column.jsx');

const Track = React.createClass({
  render: function () {
    return (
      <div className="track">

        <Row>
          <Col s={6}>
            {this.props.track.name}
          </Col>
          <Col s={6}>
            {this.props.track.bpm}
          </Col>
        </Row>

        <Row>
          <Col s={12}>
            {this.renderTrackAnalysis()}
          </Col>
        </Row>

      </div>
    );
  },

  renderTrackAnalysis: function () {

    let bufferLength = this.props.track.bufferLength,
      analysis;

    if (this.props.track.analysed) {
      analysis = (
        <svg className="track-analysis">
          {
            this.props.track.peaks.map(
              (peak) => {
                let x = (100 * peak / bufferLength) + '%';
                return (
                  <rect key={x} x={x} y="0" width="1" height="100%"></rect>
                );
              }
            )
          }
        </svg>
      );
    } else {
      analysis = (
        <div className="awaiting-analysis">
          <span>Awaiting Analysis</span>
        </div>
      );
    }

    return analysis;
  }

});

module.exports = Track;
