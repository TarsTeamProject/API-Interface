const Tars = require("@tars/rpc").client;
const UsersObj = require('../config/objNames').User;

const UsersModule = {};

// server functions
UsersModule.login = async ctx => {
    try {
        ctx.body = DataHandle.returnData(200, 'success', {testStr});
    }
    catch(e) {
        console.log(e);
        ctx.body = DataHandle.returnError(400, e.message);
    }
}


module.exports = UsersModule;