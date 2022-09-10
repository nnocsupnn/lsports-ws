const amqp = require('amqplib')
const environtmentValues = process.env

const queuePkg = `_${environtmentValues.LSPORT_PACKG_ID}_`
const raabitmqSettings = {
    protocol: 'amqp',
    hostname: environtmentValues.LSPORT_HOST,
    port: 5672,    
    vhost: 'Customers',
    username: environtmentValues.LSPORT_USR,
    password: environtmentValues.LSPORT_PW,
    locale: 'en_US',
    hearteat: 580
}

const getConnection = async () => {
    try {
        return await amqp.connect(raabitmqSettings)
    } catch (e) {
        console.error(e)
    }
}

const getChannel = async () => {
    const connection = await getConnection()
    console.info(`[RMQ] Channel created`)
    return await connection.createChannel()
}

const registerConsumer = async consumer => {
    if (typeof consumer != 'function') throw Error("Argument consumer must be a function.")
    const ch = await getChannel()
    await ch.consume(queuePkg, consumer, {
        noAck: true, consumerTag: "consumer"
    }) 
}

module.exports = {
    registerConsumer
}