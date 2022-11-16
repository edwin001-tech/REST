leg
===

logs of json

Overview
--------

leg is a stupidly simple JSON-based logging thingy. It works the way I want it
to, and you might also garner some utility from it. If not, that's fine.

Super Quickstart
----------------

```javascript
var log = require("leg")();

log.info("something happened!", {some: "other", things: "here"});
```

```json
["2013-05-13T04:11:00.664Z","INFO","something happened!",{"some":"other","things":"here"}]
```

Installation
------------

Available via [npm](http://npmjs.org/):

> $ npm install leg

Or via git:

> $ git clone git://github.com/deoxxa/leg.git node_modules/leg

API
---

**leg**

Creates a new logging function thing. Optionally takes a writable stream to
output to as an argument. By default, will use `process.stderr`. The return
value is a function that you can use to log things!

```javascript
leg([stream]);
```

```javascript
// instantiate with default process.stderr output
var log = leg();

// instantiate with different output
var log = log(process.stdout);
```

**log**

This is the return value of `leg()`. It takes three arguments, with the last one
being optional. It also has a few convenience things tacked onto it, read on
below for more info on them.

```javascript
log(level, text, [info]);
```

```javascript
// log without any context information
log("EMERGENCY", "there are very few donuts left");

// log with some useful context data
log("EMERGENCY", "there are very few donuts left", {donutCount: 3});
```

```json
["2013-05-13T04:13:51.640Z","EMERGENCY","there are very few donuts left",null]
["2013-05-13T04:13:51.640Z","EMERGENCY","there are very few donuts left",{"donutCount":3}]
```

Arguments

* _level_ - the coarse level of the log message. e.g. "ERROR"
* _text_ - the main text body of the message. e.g. "received request"
* _info_ - any kind of `JSON.stringify`-able value (default `null`)

**debug**
**info**
**warn**
**error**

These are all properties of the `log` function. They just provide a suggested
set of log levels. You can even create your own!

```javascript
log.debug(text, info)
log.info(text, info)
log.warn(text, info)
log.error(text, info)
```

```javascript
log.debug("some debugging info", {someMetric: 12345});
```

```json
["2013-05-13T04:20:50.477Z","DEBUG","some debugging info",{"someMetric":12345}]
```

Arguments

* _text_ - same as `text` in `log`
* _info_ - same as `info` in `log`

Creating your own

```javascript
log.silly = log.bind(log, "SILLY");
log.silly("yippee", {woo: "hoo"});
```

```json
["2013-05-13T04:22:36.299Z","SILLY","yippee",{"woo":"hoo"}]
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
