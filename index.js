require("dotenv").config();
const APIRouters = require('./router');
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const sessConfig = require('./config/session');
const session = require('koa-session');
const logger = require('./config/logs');

// server config
const hostname = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 8080;
const app = new Koa();
const ENV = process.env.NODE_ENV || "production";

// middlewares
app.use(session(sessConfig, app));
app.use(bodyParser());
app.use(APIRouters.routes());

// init & run
app.host = hostname;
app.port = port;
app.env = ENV;
app.keys = ['BF68FEB7A66E0E2B8E063A7C234E28D5EACEBC6C', '1C1A2B0D1542E709105825568565F890DA771B07'];
const server = app.listen(app.port, app.host, () => {
    logger.info(`API gateway listening on ${server.address().address}:${server.address().port}`);
})