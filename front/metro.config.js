/* eslint-disable @typescript-eslint/no-var-requires */

const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = [
    'js',
    'ts',
    'jsx',
    'tsx',
    'json',
    'flow',
];

module.exports = config;
