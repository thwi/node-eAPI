node-eAPI
=========

## Overview

node.js methods for issuing commands to the Arista EOS API (eAPI).

Requires EOS >= 4.12 and an enabled HTTP API service:

```
switch1(config)#management api http-commands
switch1(config-mgmt-api-http-cmds)#proto https
switch1(config-mgmt-api-http-cmds)#no shut
```

## Installation

```
npm install eapi
```

## Usage

### Create instance 

```
var eAPI = require('eapi');

var switch1 = new eAPI({
  host: 'switch1',
  proto: 'https',
  port: 443,
  user: 'admin',
  pass: 'admin',
  strict: true
});
```

### Basic commands
#### switch.exec(cmds, callback)

```
switch1.exec([ 'show version' ], function(err, res) {
  // command output
});
```

### Editing configuration
#### switch.exec([ 'enable', 'configure', ... ], callback)

```
switch.exec([
  'enable',
  'configure',
  'interface Et1',
  'switchport mode access',
  'switchport access vlan 10'
], function(err, res) {
  // command output
});
````

See Arista eAPI documentation for detail.

## Notes / Resources

* Full commands must be specified (eg. 'show interfaces' instead of 'sh int')
* https://eos.aristanetworks.com/2013/03/eapi-laerning-the-basics/
