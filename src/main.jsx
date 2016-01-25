// FLUX CONFIG

require('./flux');

// ROUTE CONFIG

const React = require('react'), // eslint-disable-line no-unused-vars
  reactRouter = require('react-router'),
  Router = reactRouter.Router,
  Route = reactRouter.Route,
  IndexRoute = reactRouter.IndexRoute,
  ReactDom = require('react-dom');

const Layout = require('./components/Layout.jsx'),
  Player = require('./components/Player.jsx'),
  Playlist = require('./components/Playlist.jsx');

const history = require('./history');

ReactDom.render(
  <Router history={history}>
    <Route path="/(autodj)" component={Layout}>
      <Route path="player" component={Player}/>
      <IndexRoute component={Playlist}/>

      <Route path="playlist" components={Playlist}/>
    </Route>
  </Router>,
  document.getElementById('app'));
