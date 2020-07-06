const User = require('../modules/User');
const { UserServiceProxy } = require('../proxy');

const apis = [
    // Test
    ['get', '/test', User.test],
    ['post', '/test', User.test],
    // User
    ['post', '/login', User.login],
    ['get', '/logout', User.logout],
    ['post', '/register', User.register]
];

module.exports = apis;