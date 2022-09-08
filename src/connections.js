const env = require("dotenv")
const amqp = require('amqplib')
const { createClient } = require("redis")
const BullQueue = require("bull")

env.config()
const environtmentValues = process.env

let queuePkg = `_${environtmentValues.LSPORT_PACKG_ID}_`
let usr = environtmentValues.LSPORT_USR
let pw = environtmentValues.LSPORT_PW

var raabitmqSettings = {
    protocol: 'amqp',
    hostname: environtmentValues.LSPORT_HOST,
    port: 5672,    
    vhost: 'Customers',
    username: usr,
    password: pw,
    locale: 'en_US',
    hearteat: 580
}

// RMQ
const getConnection = async () => {
    try {
        return await amqp.connect(raabitmqSettings)
    } catch (e) {
        console.error(e)
    }
}

const getChannel = async () => {
    const connection = await getConnection()
    return await connection.createChannel()
}

const registerConsumer = async consumer => {
    if (typeof consumer != 'function') throw Error("Argument consumer must be a function.")
    const ch = await getChannel()
    await ch.consume(queuePkg, consumer, {
        noAck: true, consumerTag: "consumer"
    }) 
}

// REDIS
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
    registerConsumer,
    createRedisConnection,
    Queues
}
