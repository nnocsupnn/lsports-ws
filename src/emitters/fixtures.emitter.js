module.exports = (io, queues) => {
    const ns = io.of('/Fixtures')
    
    ns.on('connection', client => {

        client.emit('eventx', { message: 'Welcome!', id: client.id });
        client.on('eventx', msg => {
            console.log(msg)
        });
    
        client.on('disconnect', () => {});
    });
}