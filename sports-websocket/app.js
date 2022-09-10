const server = require('http').createServer();
const { createRedisConnection, Queues } = require('../sports-app/connections')
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
    // TODO: Create central connection detection
    client.on('disconnect', () => {});
});


server.listen(port, () => console.log(`Socket Server Started @ ${port}`));