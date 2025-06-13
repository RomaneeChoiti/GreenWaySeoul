module.exports = {
  presets: [
      'module:@react-native/babel-preset',
      '@babel/preset-typescript',
      '@babel/preset-flow',
    ],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@assets': './src/assets',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
      },
    ],
  ],
};
