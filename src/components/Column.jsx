const React = require('react');

const Column = React.createClass({

  propTypes: {
    s: React.PropTypes.number.isRequired,
    m: React.PropTypes.number,
    l: React.PropTypes.number
  },

  generateClassName: function () {
    let className = `col-xs-${this.props.s}`;
    if (this.props.m) {
      className = `${className} col-md-${this.props.m}`;
    }
    if (this.props.l) {
      className = `${className} col-lg-${this.props.l}`;
    }
    return className;
  },

  render: function () {
    return (
      <div className={this.generateClassName()}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;
