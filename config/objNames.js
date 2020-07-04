// 对于非tars运行环境，需要 @tcp ... 来表明目标模块所在的位置。
// 对于tars运行环境，则不需要
const registerLocator = "@tcp -h 192.168.0.1 -t 60000 -p 8080"//"@tcp -h moduleIP -t 60000 -p modulePort"

module.exports = {
    UserServiceObjName: `RentHouse.UserService.UserServiceObj`, //${registerLocator}
}