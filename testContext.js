require('jasmine-expect');
require('es5-shim');

var context = require.context('./src', true, /.+Spec\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
