const status = require("../tars/StatusCodeTars").RentHouse.StatusCode;

const statusStirng = {};

statusStirng._getErrorMsg = function (code) {
    switch(code) {
        case status.SUCCESS:
            return "";
        case status.INTERNAL_ERROR:
            return "服务器内部错误";
        case status.USER_NOT_EXSIT:
            return "用户不存在";
        case status.USER_EXSIT:
            return "用户已存在";
        case status.WRONG_PW_OR_NAME:
            return "用户名或密码错误";
        default:
            return "未知错误";
    }
};

statusStirng.response = function (code, body) {
    if (code===status.SUCCESS) {
        return this._body(code, body);
    }
    return this._body(code, this._getErrorMsg(code));
};

statusStirng._body = function (status, body) {
    return {
        status,
        body
    }
};


module.exports = statusStirng;