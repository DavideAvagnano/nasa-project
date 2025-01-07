module.exports = {
  preset: "ts-jest", // Use the ts-jest preset to support TypeScript
  testEnvironment: "node", // Set the test environment to Node.js
  roots: ["<rootDir>"], // The folder where test files are located
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ["ts", "js", "json", "node"], // Supported file extensions
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json", // Use the tsconfig.json for TypeScript configuration
    },
  },
};
