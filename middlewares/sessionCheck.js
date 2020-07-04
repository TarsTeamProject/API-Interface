const sessionCheck = {};

sessionCheck.needLogin = async function (ctx, next) {
    console.log("isLogin?");
    await next();
}

sessionCheck.loginBefore = async function (ctx, next) {
    console.log("loginBefore");
    await next();
}

module.exports = sessionCheck;