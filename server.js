const Koa = require('koa')
const app = new Koa()

// middle
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

//
const hostname = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 8080;

// router
const APIRouters = require('./router');
app.use(APIRouters.routes());

// init koa app;
app.host = hostname;
app.port = port;

const server = app.listen(app.port, app.host, () => {
    console.log(`API gateway listening on ${server.address().address}:${server.address().port}`);
})