const { createClient } = require("redis")
const BullQueue = require("bull");
const environtmentValues = process.env

const createRedisConnection = async () => {
    const user = environtmentValues.REDIS_USER
    const pass = environtmentValues.REDIS_PASSWORD
    const host = environtmentValues.REDIS_HOST
    const port = environtmentValues.REDIS_PORT

    const redisClient = await createClient({ url: `redis://${user}:${pass}@${host}:${port}` })

    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    redisClient.on('connect', () => console.log('REDIS: Connection Established.'));
    redisClient.on('ready', () => console.log('REDIS: Connection is ready.'))
    redisClient.on('end', () => console.log('REDIS: Connection is closed.'))
    redisClient.on('reconnecting', () => console.log('REDIS: Retrying connection.'))

    await redisClient.connect()

    return await redisClient
}

// Bull Queue
const options = {
    redis: {
        port: environtmentValues.REDIS_PORT,
        host: environtmentValues.REDIS_HOST,
        password: environtmentValues.REDIS_PASSWORD
    }
}

const Queues = {
    FixtureQueues: new BullQueue('fixture.queues', options),
    LivescoreQueues: new BullQueue('livescore.queues', options),
    MarketQueues: new BullQueue('markets.queues', options)
}

module.exports = {
    createRedisConnection,
    Queues
}