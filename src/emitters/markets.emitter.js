module.exports = (io, queues) => {
    const ns = io.of('/Markets')
    
    ns.on('connection', client => {
        client.emit('eventx', { message: 'Welcome!', id: client.id });
        client.on('eventx', msg => {
            console.log(msg)
        });

        queues.MarketQueues.on('global:completed', (jobId, result) => {
            client.emit('eventx', result)
        })
    
        client.on('disconnect', () => {});
    });
}