
module.exports.queues = undefined
module.exports.redis = undefined
module.exports.consumer = async data => {
    if (this.redis == undefined) throw Error("Redis connection must be initialized before calling consume.")

    const jsonData = JSON.parse(data.content)
    const jobOption = {
        lifo: false,
        removeOnComplete: 5000,
        removeOnFail: 5000,
        timeout: 3000,
        attempts: 3,
        backoff: 3000
    }

    switch (jsonData.Header.Type) {
        /**
         * Fixtures
         */
        case 1 || '1':
        case 36 || '36':
            await this.queues.fixtures.add(jsonData.Body, {...jobOption });
            break;
        /**
         * Livscores
         */
        case 2 || '2':
            await this.queues.livescores.add(jsonData.Body, {...jobOption });
            break;

        /**
         * Markets
         */
        case 3 || '3':
        case 35 || '35':
            await this.queues.markets.add(jsonData.Body, {...jobOption });
            break;

        /**
         * Keep Alive
         * 
         * HeartBeat
         */
        case 31 || '31':
            break;

        default:
            // ..
            break;
    }

    // await this.redis.lPush(process.env.REDIS_QUEUE_NAME, stringData).then(count => console.info(`List Length: ${count}`)).catch(console.error)
}