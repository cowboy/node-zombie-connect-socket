/*
 * node-zombie-connect-socket
 * https://github.com/cowboy/node-zombie-connect-socket
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

// Built-in libs.
var HTTP = require('http');
var path = require('path');

// My library for hooking methods of objects.
var hooker = require('hooker');
// Super-simple web server lib.
var connect = require('connect');
// Our headless browser of choice.
var zombie = require('zombie');

// Create a temp file to be used for the socket.
var Tempfile = require('temporary/lib/file');
var tempfile = new Tempfile();

// Create simple web server.
var server = connect(
  // Log incoming requests (for debugging).
  connect.logger(),
  // Serve static files from webroot directory.
  connect.static(path.join(__dirname, '../webroot'))
);

// Use socket file for webserver instead of a physical port like 9001.
server.listen(tempfile.path);

// Hook HTTP.request to use socket file for all http://cowboy/* requests,
// leaving all other external files alone.
hooker.hook(HTTP, 'request', function(options) {
  if (options.host === 'cowboy') {
    options.socketPath = tempfile.path;
  }
});

// Instead of a real physical host + port like 'http://localhost:9001/', use
// made-up host for all local files (external files are requested normally).
var url = 'http://cowboy/test.html';

// Start zombie, requesting url through the "cowboy" host, which gets mapped
// to the socket file, which our connect server is listening to.
zombie.visit(url, {debug: true}, function(e, browser) {
  // Timeout after 10 seconds of nothing.
  browser.wait(10000, function(err, browser) {
    // Inspect the zombie browser's DOM.
    var document = browser.document;
    var elem = document.querySelector('#test');
    // This should log something!
    console.log('>>>', elem.textContent, '<<<');

    // Clean up.
    hooker.unhook(HTTP, 'request');
    tempfile.unlink();
    server.close();

    // Exit.
    console.log('All done!');
    process.exit(0);
  });
});
