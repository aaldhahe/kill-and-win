// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
 
const rootDirAndSetup = {
    rootDir: './',
    // setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};
 
const jest = {
    preset: 'ts-jest'
};
 
const tests = {
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
    testRegex: '((/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$)|((/suites/.*|(\\.|/)(test|spec))\\.tsx?$)',
    moduleFileExtensions: ['ts', 'js', 'node'],
    testMatch: null
};
 
const tsJest = {
    'ts-jest': {
        isolatedModules: true,
        packageJson: 'package.json'
    }
};
 
const coverage = {
    collectCoverageFrom: ['./src/**', '!./src/__tests__/**', '!./src/client/**', '!./src/views/**', '!./src/server/server.ts'],
    coverageReporters: ['lcov', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 100,
            lines: 99
        }
    }
};
 
module.exports = {
    ...rootDirAndSetup,
    ...jest,
    ...tests,
    ...coverage,
    globals: {
        ...tsJest
    },
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './reports',
                filename: 'unit-test-results.html'
            }
        ]
    ]
};