module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      'react-native|' +
      '@react-native|' +
      '@react-navigation|' +
      'react-native-safe-area-context|' +
      'react-native-gesture-handler|' +
      'lucide-react-native|' +
      'react-native-svg|' +
      'react-redux|' +
      '@reduxjs/toolkit|' +
      'immer' +
    ')/)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/ios/',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
  ],
};
