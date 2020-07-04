const status = require("../tars/StatusCodeTars").RentHouse.StatusCode;

const statusStirng = {};

statusStirng._getErrorMsg = function (code) {
    switch (code) {
        case status.SUCCESS:
            return "操作成功";
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

statusStirng.response = function (recStatus, body) {
    // default Error obj;
    if (typeof recStatus !== 'number') {
        return this._body(status.INTERNAL_ERROR, recStatus.message ?? this._getErrorMsg(status.INTERNAL_ERROR));
    }
    // success status
    if (parseInt(recStatus) === status.SUCCESS) {
        return this._body(recStatus, body ?? this._getErrorMsg(recStatus));
    }
    // other error status.
    return this._body(recStatus, this._getErrorMsg(recStatus));
};

statusStirng._body = function (status, body) {
    return {
        status,
        body
    }
};


module.exports = statusStirng;