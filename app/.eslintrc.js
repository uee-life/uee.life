module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "vue/html-indent": "off",
    "indent": "off",
    "vue/singleline-html-element-content-newline": "off"
  },
  globals: {}
}
