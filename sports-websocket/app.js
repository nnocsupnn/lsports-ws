const server = require('http').createServer();
const { createRedisConnection, Queues } = require('../src/connections')
const emitterMarkets = require("./emitters/markets.emitter")
const emitterFixtures = require("./emitters/fixtures.emitter")
const emitterLivescore = require("./emitters/livescores.emitter")

const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    },
    transports: ['websocket']
})

const port = process.env.PORT;


([emitterMarkets, emitterFixtures, emitterLivescore]).map(emitter => emitter(io, Queues));

io.on('connection', async client => {
    // const redisConnection = await createRedisConnection()

    // await redisConnection.brPop(process.env.REDIS_QUEUE_NAME, (error, data) => {
    //     if (error) throw Error(error)
    //     console.log(data)
    //     process.exit()
    // })
    
    // client.emit('eventx', { message: 'Welcome!', id: client.id });
    // client.on('eventx', msg => {
    //     console.log(msg)
    // });

    client.on('disconnect', () => {});
});


server.listen(port, () => console.log(`Socket Server Started @ ${port}`));