// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  parserOptions: {
    project: "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      "typescript": { alwaysTryTypes: true, }, // Ensure TypeScript paths resolve
      "node": {
        "paths": ["src"], // Match your tsconfig.json
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }

};
