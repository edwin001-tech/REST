#!/usr/bin/env node

var log = require("./")(process.stderr);

// basic, normal usage
log.info("something happened!", {some: "other", things: "here"});

// log without any context information
log("EMERGENCY", "there are very few donuts left");

// log with some useful context data
log("EMERGENCY", "there are very few donuts left", {donutCount: 3});

// yay json
log.debug("some debugging info", {someMetric: 12345});

// hey look, our own level definition
log.silly = log.bind(log, "SILLY");
log.silly("yippee", {woo: "hoo"});
