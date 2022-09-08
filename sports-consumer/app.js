const connections = require('./connections');
const pusher = require('./producer/pusher');

(async ({ registerConsumer, createRedisConnection, Queues }) => {
    pusher.redis = await createRedisConnection()
    pusher.queues = {
        fixtures: Queues.FixtureQueues,
        livescores: Queues.LivescoreQueues,
        markets: Queues.MarketQueues,
    }

    // Register the consumer
    await registerConsumer(pusher.consumer)

    // await pusher.redis.disconnect()
})(connections)

