// FLUX CONFIG

require('./flux');

// ROUTE CONFIG

const React = require('react'), // eslint-disable-line no-unused-vars
  reactRouter = require('react-router'),
  Router = reactRouter.Router,
  Route = reactRouter.Route,
  ReactDom = require('react-dom');

const Layout = require('./components/Layout.jsx');

const history = require('./history');

ReactDom.render(
  <Router history={history}>
    <Route path="/" component={Layout}>

    </Route>
  </Router>,
  document.getElementById('app'));
