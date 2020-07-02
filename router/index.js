const api = require('./routers');
const Router = require('koa-router');

const getRouter = (router, routerConf) => {
    routerConf.forEach(function (conf) {
            var [method, url, server] = conf;

            router[method](url, async (ctx, next) => {
                    await server.call({}, ctx);
                    await next();
            });

    });
};

const apiRouter = new Router();
getRouter(apiRouter, api);

module.exports = apiRouter;