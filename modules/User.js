const Tars = require("@tars/rpc").client;
const UsersObj = require('../config/objNames').User;

const UserServiceProxy = require('../tars/UserServiceProxy').RentHouse.UserServiceProxy;
const StatusCode = require('../tars/StatusCodeTars').RentHouse.StatusCode;
const User = require('../tars/DataBaseServiceTars').RentHouse.User;
const userDeployName = ""

const Methods = require("../tools/methods");
const statusString = require("../tools/statusString");
const statusStirng = require("../tools/statusString");

const UsersModule = {

    // test:
    test: async (ctx) => {
        try {
            if (Math.random() > 0.6) throw StatusCode.INTERNAL_ERROR;
            const methods = ctx.method;
            let res = {};
            if (methods === Methods.GET) {
                res = ctx.query;
            }
            if (methods === Methods.POST) {
                res = ctx.request.body;
            }
            ctx.body = statusStirng.response(StatusCode.SUCCESS, res);
        } catch (e) {
            ctx.body = statusString.response(e, {});
        }
    },

    // for login
    login: async (ctx) => {
        try {
            const prx = Tars.stringToProxy(UserServiceProxy,)
            ctx.body = DataHandle.returnData(200, 'success', { testStr });
        } catch (e) {
            console.log(e);
            ctx.body = DataHandle.returnError(400, e.message);
        }
    },
};


module.exports = UsersModule;