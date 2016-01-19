const React = require('react');

const Track = React.createClass({
  render: function () {
    return (
      <div> {this.props.track.name} </div>
    );
  }
});

module.exports = Track;
