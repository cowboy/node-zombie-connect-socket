# zombie <-> connect, without a physical port.

Sample code showing how to get zombie.js to talk to connect via socket file.

_(Which is necessary because relative URLs don't seem to work in zombie when file:// is used. Plus, file:// sucks.)_

Tested in Node.js 0.6.8 on OS X.

## Try it out
This isn't in npm.

```bash
git clone git@github.com:cowboy/node-zombie-connect-socket.git
cd node-zombie-connect-socket
npm install
node lib/tutorial.js
```

## FWIW
I used this technique in grunt's [qunit task](https://github.com/cowboy/grunt/blob/master/tasks/qunit.js).

## License
Copyright (c) 2012 "Cowboy" Ben Alman  
Licensed under the MIT license.
