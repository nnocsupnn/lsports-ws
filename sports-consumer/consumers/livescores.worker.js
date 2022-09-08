const { Queues } = require("../../sports-app/connections")

Queues.LivescoreQueues.process(2, async (job, done) => {
    done(null, job.data)
    console.log(job.data)
})


