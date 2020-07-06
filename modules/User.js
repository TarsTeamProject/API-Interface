const StatusCode = require('../tars/StatusCodeTars').RentHouse.StatusCode;
const Methods = require("../tools/methods");
const statusString = require("../tools/statusString");
const { UserServiceProxy }  = require("../proxy");
const logger = require('../config/logs');

const UsersModule = {

    // test:
    test: async (ctx) => {
        logger.debug(`request /test by method ${ctx.request.method} from ${ctx.request.host}`);
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
            logger.error(`request ${ctx.request.url}: ${e}`);
            status = e;
            res = null;
        } finally {
            logger.debug('response set')
            ctx.body = statusString.response(status, res);
        }
    },

    // for login
    login: async (ctx) => {
        let status = null, res = null;
        try {
            // paramet check 
            const name = ctx.request.body.name || undefined,
                password = ctx.request.body.password || undefined;
            if (!name || !password) {
                throw 403;
            }
            if (ctx.session.user !== undefined) {
                // session exist
                status = StatusCode.SUCCESS;
                res = "已登陆";
            } else {
                // session doesn't exist
                let user_id = null, user = null;
                const loginRes = (await UserServiceProxy.login(name, password));
                user_id = loginRes.response.arguments.user_id;
                user = loginRes.response.arguments.user.toObject();
                status = loginRes.response.arguments.status;
                if (parseInt(status) !== StatusCode.SUCCESS) {
                    throw status;
                }
                ctx.session.user = { user_id, ...user };
                res = ctx.session.user;
            }
        } catch (e) {
            logger.error(e);
            status = e;
            res = null;
        } finally {
            ctx.body = statusString.response(status, res);
        }
    },

    register: async (ctx) => {
        let status = null, res = null;
        try {
            // paramet check 
            const name = ctx.request.body.name || undefined,
                password = ctx.request.body.password || undefined,
                gender = ctx.request.body.gender || undefined,
                avatarUrl = ctx.request.body.avatarUrl || undefined;
            if (!name || !password || !gender || !avatarUrl) {
                throw 403;
            }
            let user_id = null, user = null;
            const registerRes = await UserServiceProxy.register(name, password, gender, avatarUrl);
            user_id = registerRes.response.arguments.user_id;
            user = registerRes.response.arguments.user.toObject();
            status = registerRes.response.arguments.status;
            if (parseInt(status) !== StatusCode.SUCCESS) {
                throw status;
            }
            ctx.session.user = { user_id, ...user };
            res = ctx.session.user;
        } catch (e) {
            logger.error(e);
            status = e;
            res = null;
        } finally {
            ctx.body = statusString.response(status, res);
        }
    },

    logout: async (ctx) => {
        let status = null, res = null;
        try {
            ctx.session = null;
            status = StatusCode.SUCCESS;
        } catch (e) {
            logger.error(e);
            status = e;
            res = null;
        } finally {
            ctx.body = statusString.response(status, res);
        }
    },
};


module.exports = UsersModule;