const React = require('react');

const FluidContainer = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        {
          this.props.children
        }
      </div>
    );
  }
});

module.exports = FluidContainer;

