const tarsLogs = require('@tars/logs');

let logger = null;

if (process.env.NODE_ENV == "production") {
    logger = new tarsLogs('TarsRotate');
} else {
    logger = {
        info: (val) => { console.info(val) },
        debug: (val) => { console.debug(val) },
        warn: (val) => { console.warn(val) },
        error: (val) => { console.error(val) },
    }
}

module.exports = logger;


