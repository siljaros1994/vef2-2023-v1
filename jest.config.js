module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  module: 'esm'
};