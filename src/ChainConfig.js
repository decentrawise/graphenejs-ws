const DEFAULT_CONFIG = {
  chain_id: "0000000000000000000000000000000000000000000000000000000000000000",
  core_asset: "CORE",
  address_prefix: "GPH",
  expire_in_secs: 15,
  expire_in_secs_proposal: 24 * 60 * 60,
  review_in_secs_committee: 24 * 60 * 60
};

var config = {
  ...DEFAULT_CONFIG,

  /// Configure chain parameters
  configure: new_config => {
    Object.assign(config, new_config);
    // console.log("Chain configured to", config);
    return config;
  },

  /// Reset chain parameters to default
  reset: () => {
    Object.assign(config, DEFAULT_CONFIG);
    // console.log("Chain config reset");
    return config;
  }
};

export default config;
