const User = require('../modules/User');

const apis = [
    ['get', '/test', User.test],
    ['post', '/test', User.test],
    ['post', '/login', User.login]
];

module.exports = apis;