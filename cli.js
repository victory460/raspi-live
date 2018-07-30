#!/usr/bin/env node

'use strict';

const program = require('commander');
const os = require('os');
const info = require('./package.json');
const server = require('./lib/server');

// Coercion function for integers
const int = (value) => parseInt(value, 10);

process.title = 'raspi-live';

program
  .name(info.name)
  .description(info.description)
  .version(info.version, '-v, --version');

program
  .command('start')
  .description('start streaming video from the raspberry pi camera module')
  .option('-d, --directory <directory>', 'streaming video file hosting location', `${os.homedir()}/camera`)
  .option('-f, --format <format>', 'video streaming format [hls, dash]', /^(hls|dash)$/i, 'hls')
  .option('-l, --list-size <list-size>', 'number of streaming files in the playlist', int, 10)
  .option('-s, --storage-size <storage-size>', 'number of streaming files for storage purposes', int, 10)
  .option('-p, --port <port>', 'port number the server runs on', int, 8080)
  .action(({ directory, format, listSize, storageSize, port }) => {
    console.log(directory, format, listSize, storageSize, port);
    server(directory, format, listSize, storageSize, port);
  });

program.parse(process.argv);

if (!program.args.length) program.help();