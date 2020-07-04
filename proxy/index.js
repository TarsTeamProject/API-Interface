const Tars = require("@tars/rpc").client;
const USProxy = require('../tars/UserServiceProxy').RentHouse.UserServiceProxy;
const { UserServiceObjName } = require("../config/objNames");

const UserServiceProxy = Tars.stringToProxy(USProxy, UserServiceObjName);

module.exports = {
    UserServiceProxy
};

