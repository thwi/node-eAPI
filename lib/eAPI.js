// lib/eAPI
'use strict';

var request = require('request')
  , util = require('util');

// Constructor
var eAPI = function(opts) {

  // Set default options
  this.proto  = (typeof opts.proto ==='string')    ? opts.proto : 'https';
  this.host   = (typeof opts.host === 'string')    ? opts.host : '127.0.0.1';
  this.url    = (typeof opts.url === 'string')     ? opts.url : '/command-api';
  this.user   = (typeof opts.user === 'string')    ? opts.user : 'admin';
  this.pass   = (typeof opts.pass === 'string')    ? opts.pass : 'password';
  this.strict = (typeof opts.strict === 'boolean') ? opts.strict : true;
  this.id     = 1;

  // Allow self-signed cert if strict not set
  // https://github.com/joyent/node/pull/4023
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = (this.strict) ? "1" : "0";

  return this;
}

eAPI.prototype.exec = function(cmds, cb) {
  var self = this;

  if (!cmds || typeof cmds !== 'object' || cmds.length < 1) {
    return cb('Must specify array of commands');
  }

  var jsonBody = {
    jsonrpc: '2.0',
    method: 'runCmds',
    params: {
      version: 1,
      cmds: cmds,
      format: 'json'
    },
    id: this.id
  };

  // Make request
  var uri = this.proto + '://' + this.host + this.url;
  var req = request.post(uri, {
    auth: {
      user: this.user,
      pass: this.pass
    },
    json: jsonBody,
    strictSSL: this.strict
  },

  // On response
  function(err, res, body) {
    self.id++;
    typeof body.result === 'object' ? cb(err, body.result) : cb(err, body);
    return self;
  });
};

module.exports = eAPI;
