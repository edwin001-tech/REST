module.exports = function leg(stream) {
  stream = stream || process.stderr;

  var log = function(level, summary, info) {
    stream.write(JSON.stringify([(new Date()).toISOString(), level.toUpperCase(), summary, info]) + "\n");
  };

  ["debug", "info", "warn", "error"].forEach(function(level) {
    log[level] = log.bind(null, level);
  });

  return log;
};
