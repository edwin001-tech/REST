#!/usr/bin/env node

var randomId = require("../");

console.log(randomId(process.argv[2] && parseInt(process.argv[2], 10) * 2));
