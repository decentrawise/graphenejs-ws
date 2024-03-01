# Graphene websocket interface (graphenejs-ws)

Pure JavaScript Graphene websocket library for node.js and browsers. Can be used to easily connect to and obtain data from any Graphene blockchain via public apis or local nodes.


## Setup

This library can be obtained through npm:
```
npm install --save @decentrawise/graphenejs-ws
```
or
```
yarn add @decentrawise/graphenejs-ws
```

## Usage

Several examples are available in the /examples folder, and the tests in /test also show how to use the library.

Browser bundles are provided, see below. A variable `graphene_ws` will be available in `window` object.

For use in a webpack/browserify context, see the example below for how to open a websocket connection to an API and subscribe to any object updates:

```
var {Apis} = require("graphenejs-ws");
Apis.instance("ws://127.0.0.1:8090", true).init_promise.then((res) => {
    console.log("connected to chain id:", res[0].chain_id);
    Apis.db.set_subscribe_callback( updateListener, true )
});

function updateListener(object) {
    console.log("set_subscribe_callback:\n", object);
}
```
The `set_subscribe_callback` callback (updateListener) will be called whenever an object on the blockchain changes or is removed. This is very powerful and can be used to listen to updates for specific accounts, assets or almost anything else, as all state changes happen through object updates. Be aware though that you will receive quite a lot of data this way.


## Public API 

### Database API

To access the Database API, you can use the `Apis.db` object.

__Usage example__
`Apis.db.get_objects(["1.3.0", "2.0.0", "2.1.0"])`

### History API

To access the Account History API, you can use the `Apis.history` object.

__Usage example__
`Apis.history.get_account_history("1.2.849826", "1.11.0", 10, "1.11.0")`

## Tests

The tests show several use cases, to run, simply type `yarn test`. The tests require a local Graphene node to be running, as well as an active internet connection.

## Binaries / Browserified bundles

Please have a [look here](https://github.com/decentrawise/graphenejs-ws/releases) to find your desired release.

If you want to build the binaries yourself you can clone this repository and run `yarn`. It will create:

-   Browserified version `build/graphenejs-ws.js`
-   Browserified and minified (babel) version `build/graphenejs-ws.min.js`

