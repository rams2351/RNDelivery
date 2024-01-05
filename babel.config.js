module.exports = api => {
  const env = api.env();

  const pathResolver = [
    'module-resolver',
    {
      root: ['./'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        assets: './src/assets',
        screens: './src/screens',
        utils: './src/utils',
      },
    },
  ];

  const plugins = [pathResolver];

  if (env != 'development') {
  }
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [...plugins],
  };
};
