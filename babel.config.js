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
        api: './src/api',
      },
    },
  ];

  const plugins = [pathResolver];

  if (env != 'development') {
  }
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [...plugins],
  };
};
