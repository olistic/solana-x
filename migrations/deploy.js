// Migrations are an early feature. Currently, they're nothing more than this
// single deploy script that's invoked from the CLI, injecting a provider
// configured from the workspace's Anchor.toml.

// eslint-disable-next-line import/no-extraneous-dependencies
const anchor = require('@project-serum/anchor');

module.exports = async (provider) => {
  // Configure client to use the provider.
  anchor.setProvider(provider);

  // Add your deploy script here.
};
