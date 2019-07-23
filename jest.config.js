module.exports = {
  verbose: true,
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/test/enzyme.config.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
};