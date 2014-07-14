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

logger.info('Hello, こおろぎ！');
```

```sh
node app | node node_modules/co-logging
# pretty logs..
```

## options
### level: String
"DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL"
(defaults to "WARN")

### stream: stream.Writable | String
If value is a String then it's treated as file path.
(defaults to process.stdout)

### useAbsolutePath: Boolean
this option is affect fileName field.
(defaults to false)

ex)

  main script: /var/lib/node/applications/sample/server.js

  logged at: /var/lib/node/applications/sample/lib/foo.js

  false -> fileName: lib/foo.js

  true  -> fileName: /var/lib/node/applications/sample/lib/foo.js
