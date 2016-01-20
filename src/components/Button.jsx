const React = require('react');

const Gliff = require('./Gliff.jsx');

const SaveButton = React.createClass({

  propTypes: {
    click: React.PropTypes.func.isRequired,
    gliff: React.PropTypes.string.isRequired
  },

  render: function () {
    return (
      <button type="button" onClick={this.props.click} className="btn btn-primary btn-block">
        <Gliff gliff={this.props.gliff}/>
      </button>
    );
  }
});

module.exports = SaveButton;
