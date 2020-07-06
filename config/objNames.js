const objNames = {
    UserService: `RentHouse.UserService.UserServiceObj`,
}

const locators = {
    UserService: "@tcp -h localhost -t 60000 -p 12683"
}
// 对于非tars运行环境，需要 @tcp ... 来表明目标模块所在的位置。
// 对于tars运行环境，则不需要

if (process.env.NODE_ENV == "development") {
    for (const key in objNames) {
        objNames[key] += locators[key];
    }
}

module.exports = objNames;