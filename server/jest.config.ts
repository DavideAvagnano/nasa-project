export default {
  preset: "ts-jest", // Use the ts-jest preset to support TypeScript
  testEnvironment: "node", // Set the test environment to Node.js
  roots: ["<rootDir>"], // The folder where test files are located
  // Transform TypeScript files using ts-jest and use the tsconfig.json for TypeScript configuration
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
  moduleFileExtensions: ["ts", "js", "json", "node"], // Supported file extensions
};
