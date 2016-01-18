const React = require('react');

const Gliff = React.createClass({

  propTypes: {
    gliff: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <span className={`glyphicon glyphicon-${this.props.gliff}`} aria-hidden="true"></span>
    );
  }
});

module.exports = Gliff;
