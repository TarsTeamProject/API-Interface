const Tars = require("@tars/rpc").client;

const StatusCode = require('../tars/StatusCodeTars').RentHouse.StatusCode;
const UserServiceProxy = require('../tars/UserServiceProxy').RentHouse.UserServiceProxy;
const { UserServiceObjName } = require("../config/objNames");
const User = require('../tars/DataBaseServiceTars').RentHouse.User;

const Methods = require("../tools/methods");
const statusString = require("../tools/statusString");
const statusStirng = require("../tools/statusString");

const UsersModule = {

    // test:
    test: async (ctx) => {
        let status = null, res = null;
        try {
            if (Math.random() > 0.6) throw StatusCode.INTERNAL_ERROR;
            const methods = ctx.method;
            if (methods === Methods.GET) {
                res = ctx.query;
            }
            if (methods === Methods.POST) {
                res = ctx.request.body;
            }
            status = StatusCode.SUCCESS;
        } catch (e) {
            status = e;
            res = null;
        } finally {
            ctx.body = statusString.response(status, res);
        }
    },

    // for login
    login: async (ctx) => {
        let status = null, res = null;
        try {
            if (ctx.session.user !== undefined) {
                // session exist
                status = StatusCode.SUCCESS;
                res = "已登陆";
            } else {
                // session doesn't exist
                const prx = Tars.stringToProxy(UserServiceProxy, UserServiceObjName);
                const loginRes = await prx.login();
                res = loginRes.response.arguments.loginUser.toObject();
                status = loginRes.response.arguments.status;
                if (parseInt(status) !== StatusCode.SUCCESS) {
                    throw status;
                }
                // set session;
                console.log(res, status);
                ctx.session.user = res;

                // // for test without TARS.
                // status = StatusCode.SUCCESS;
                // res = {
                //     userId: 1,
                //     name: "samchevia"
                // }
                // ctx.session.user = res;
            }
        } catch (e) {
            status = e;
            res = null;
        } finally {
            ctx.body = statusStirng.response(status, res);
        }
    },

    logout: async (ctx) => {
        let status = null, res = null;
        try {
            ctx.session = null;
            status = StatusCode.SUCCESS;
        } catch (e) {
            status = e;
            res = null;
        } finally {
            ctx.body = statusString.response(status, res);
        }
    },
};


module.exports = UsersModule;