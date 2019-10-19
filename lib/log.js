'use strict'

const chalk = require('chalk')

const levels = {
  debug: 0,
  info: 1,
  error: 2,
  success: 3,
  list: 4
}

const emoji = {
  debug: '🐛',
  info: '✨',
  error: '🚨',
  success: '✅',
  list: '➡️'
}

const colors = [l => l, chalk.blue, chalk.red, chalk.green, chalk.blue]

function log (level, message) {
  const severity = levels[level] || 0
  const icon = emoji[level]

  console.log(`${icon}   ${colors[severity](message)}`)
}

module.exports = log
