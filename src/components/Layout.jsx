const React = require('react'),
  NavBarContainer = require('./nav-bar-container.jsx');

const Layout = React.createClass({

  render: function () {
    return (
      <div>
        <NavBarContainer/>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Layout;
