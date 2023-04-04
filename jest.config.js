/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageProvider: "v8",
    coverageReporters: ["json", "text", "lcov", "clover"],
    detectOpenHandles: true,
    forceExit: true,

    // // The test environment that will be used for testing
    testEnvironment: "jsdom",
    // testEnvironment: "jest-environment-jsdom",

    TextEncoder: require("util").TextEncoder,
    TextDecoder: require("util").TextDecoder,
    // preset: "ts-jest",
    // testEnvironment: "node",
    // transform: {
    //     "^.+\\.ts?$": "ts-jest",
    // },
    // transform: {},
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["./jest.setup.js"],
};
