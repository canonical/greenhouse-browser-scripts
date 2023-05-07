module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageProvider: "v8",
    coverageReporters: ["json", "text", "lcov", "clover"],
    setupFilesAfterEnv: ["./jest.setup.js"],
};
