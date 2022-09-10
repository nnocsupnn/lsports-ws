const env = require("dotenv")
const fs = require("fs")

(() => {
    if (!fs.existsSync(process.cwd() + '\\.env')) throw Error("Please create an .env file from .env.example")
    env.config()
})();

module.exports = {
    ...require("./connections/redis.connection"),
    ...require("./connections/rmq.connection")
}