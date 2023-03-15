module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'prismjs',
      {
        languages: [
          'html',
          'css',
          'javascript',
          'php',
          'dart',
          'bash',
          'dockerfile',
          'nginx',
          'sql',
          'c',
          'cpp',
          'python',
          'go',
          'java',
          'python',
          'json'
        ],
        plugins: [
          'line-numbers',
          'show-language',
          'copy-to-clipboard'
        ],
        theme: 'tomorrow',
        css: true
      }
    ]
  ]
}
