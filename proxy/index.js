const Tars = require("@tars/rpc").client;
const USProxy = require('../tars/UserServiceProxy').RentHouse.UserServiceProxy;
const { UserService } = require("../config/objNames");

const UserServiceProxy = Tars.stringToProxy(USProxy, UserService);

module.exports = {
    UserServiceProxy
};

