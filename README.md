co-logging
==========

JSON-format logger and reader

```sh
npm install co-logging
```


```javascript
var Logger = require('co-logging').Logger;
var logger = new Logger({
  level: 'DEBUG',
  stream: '/var/log/myapp/myapp.log'
});

logger.info('Hello, 蟋蟀!');
```

```sh
node app | node node_modules/co-logging
# pretty logs..
```
