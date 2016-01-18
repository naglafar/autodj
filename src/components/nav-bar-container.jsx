var React = require('react'),
  Link = require('react-router').Link,
  Gliff = require('./Gliff.jsx');

var NavBarContainer = React.createClass({

  render: () => {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

                      <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed"
                    data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/">
              <h3>
                <Gliff gliff="cd"/> Auto DJ
              </h3>
            </Link>
          </div>

          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/player">
                  <Gliff gliff="equalizer"/>
                  {
                    `  Playing`
                  }
                </Link>
              </li>
              <li>
                <Link to="/playlist">
                  <Gliff gliff="list"/>
                  {
                    `  Play List`
                  }
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBarContainer;
