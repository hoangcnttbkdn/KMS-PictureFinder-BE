/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    'node_modules',
    'dist',
    '__test__',
    'coverage',
    'jest-config.ts',
    './src/shared/providers/*',
    './src/database/migrations/*',
    './src/app/repositories/*',
    './src/database/naming-strategies',
    './src/app/middlewares/validation.middleware.ts',
    './src/app/middlewares/error.middleware.ts',
    './src/app/utils/call-ai-server.ts',

    './src/app/controllers/gg-drive.controller.ts',
    './src/app/helpers/gg-drive.helper.ts',
    './src/app/helpers/gg-oauth.helper.ts',
    '.src/app/middlewares/gg-drive.middleware.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: ['json-summary', 'html', 'text'],
}
