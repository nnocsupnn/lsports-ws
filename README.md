# Socket Server


## Consumer
```javascript
$ node sports-consumer/app.js
```

## Client WebSocket
```javascript
$ node sports-websocket/app.js
```

## Job Processors - Concurrency
```javascript
$ node sports-consumer/consumers/markets.worker.js 
$ node sports-consumer/consumers/livescores.worker.js 
$ node sports-consumer/consumers/fixtures.worker.js
```