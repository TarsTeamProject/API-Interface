const User = require('../modules/User');

const apis = [
    // Test
    ['get', '/test', User.test],
    ['post', '/test', User.test],
    // User
    ['post', '/login', User.login],
    ['get', '/logout', User.logout]
];

module.exports = apis;