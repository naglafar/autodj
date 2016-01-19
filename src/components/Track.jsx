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
            <div className="track-analysis">
              <span className="awaiting-analysis">Awaiting Analysis</span>
            </div>
          </Col>
        </Row>

      </div>
    );
  }
});

module.exports = Track;
