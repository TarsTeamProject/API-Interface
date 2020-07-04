const registerLocator = "@tcp -h 172.25.0.3 -t 60000 -p 17890"//"@tcp -h tars.chenhua.fan -p 3000  -t 60000"

module.exports = {
    UserServiceObjName: `RentHouse.UserService.UserServiceObj${registerLocator}`,
}