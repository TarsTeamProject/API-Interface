const StatusCode = require('../tars/StatusCodeTars').RentHouse.StatusCode;
const Methods = require("../tools/methods");
const statusString = require("../tools/statusString");
const statusStirng = require("../tools/statusString");
const User = require('../tars/DataBaseServiceTars').RentHouse.User;
const { UserServiceProxy }  = require("../proxy");

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
        // paramet check 
        if (ctx.request.body.name == undefined || ctx.request.body.password == undefined) {
            throw new Error("参数不正确");
        }
        let status = null, res = null;
        try {
            if (ctx.session.user !== undefined) {
                // session exist
                status = StatusCode.SUCCESS;
                res = "已登陆";
            } else {
                // session doesn't exist
                const loginRes = await UserServiceProxy.login(ctx.request.body.name, ctx.request.body.password);
                res = loginRes.response.arguments.loginUser.toObject();
                status = loginRes.response.arguments.status;
                if (parseInt(status) !== StatusCode.SUCCESS) {
                    throw status;
                }
                // set session;
                console.log(res, status);
                ctx.session.user = res;
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