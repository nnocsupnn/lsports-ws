const connections = require('../sports-app/app');
const pusher = require('./producer/pusher');

(async ({ registerConsumer, createRedisConnection, Queues }) => {
    try {
        pusher.redis = await createRedisConnection()
        pusher.queues = {
            fixtures: Queues.FixtureQueues,
            livescores: Queues.LivescoreQueues,
            markets: Queues.MarketQueues,
        }

        // Register the consumer
        await registerConsumer(pusher.consumer)
    } catch (e) {
        throw e
    }

    // await pusher.redis.disconnect()
})(connections)
.then(() => console.info(`Consumer started with no error.`))
.catch(console.error)

