import assert from "assert";
import {ChainConfig, Apis} from "../lib";

const DEFAULT_MAINNET_API = "wss://eu.nodes.bitshares.ws";
const DEFAULT_TESTNET_API = "wss://eu.nodes.testnet.bitshares.ws";

const DEFAULT_MAINNET_CONFIG = {
  core_asset: "BTS",
  address_prefix: "BTS",
};
const DEFAULT_TESTNET_CONFIG = {
  core_asset: "TEST",
  address_prefix: "TEST",
};

var coreAsset;

describe("Connection", () => {

    afterEach(function() {
        return new Promise(function(res) {
            Apis.close().then(res);
        })
    });

    it("Connect to Mainnet", function() {
        return new Promise( function(resolve, reject) {
            ChainConfig.configure(DEFAULT_MAINNET_CONFIG);
            Apis.instance(DEFAULT_MAINNET_API, true).init_promise.then(function (result) {
                coreAsset = result[0].core_asset;
                assert(coreAsset === "BTS");
                resolve();
            }).catch(reject)
        });
    });

    it("Connect to Testnet", function() {
        return new Promise( function(resolve, reject) {
            ChainConfig.configure(DEFAULT_TESTNET_CONFIG);
            Apis.instance(DEFAULT_TESTNET_API, true).init_promise.then(function (result) {
                coreAsset = result[0].core_asset;
                assert(coreAsset === "TEST");
                resolve();
            }).catch(reject)
        });
    });

    it("Times out properly", function() {
        return new Promise( function(resolve, reject) {
            /* 1ms connection timeout */
            Apis.instance(DEFAULT_MAINNET_API, true, 1).init_promise.then(function() {
                reject();
            }).catch(function(err) {
                assert(err.message.search("Connection attempt timed out") !== -1);
                resolve();
            })
        });
    });

    it("Can be closed", function() {
        return new Promise( function(resolve, reject) {
            ChainConfig.configure(DEFAULT_MAINNET_CONFIG);
            Apis.instance(DEFAULT_MAINNET_API, true).init_promise.then(function (result) {
                coreAsset = result[0].core_asset;
                assert(coreAsset === "BTS");
                Apis.instance().close().then(function() {
                    resolve();
                }).catch(reject)
            })
        });
    });
});

describe("Connection reset", () => {
    afterEach(function() {
        return new Promise(function(res) {
            Apis.close().then(res);
        })
    });

    it("Resets between chains", function() {
        return new Promise( function(resolve, reject) {
            ChainConfig.configure(DEFAULT_MAINNET_CONFIG);
            Apis.instance(DEFAULT_MAINNET_API, true).init_promise.then(function (result) {
                coreAsset = result[0].core_asset;
                assert(coreAsset === "BTS");
                ChainConfig.configure(DEFAULT_TESTNET_CONFIG);
                Apis.reset(DEFAULT_TESTNET_API, true).then(instance => {
                    instance.init_promise.then(function (result) {
                        coreAsset = result[0].core_asset;
                        assert(coreAsset === "TEST");
                        resolve();
                    }).catch(reject)
                })

            });
        });
    });
});
