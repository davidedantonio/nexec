#!/usr/bin/env node

'use strict'

const figlet = require('figlet')
const clear = require('clear')
const chalk = require('chalk')
const program = require('commander')
const { checkDB } = require('./lib/data')

checkDB()
clear()
console.log(chalk.yellow(figlet.textSync('nexec', { horizontalLayout: 'full' })))

program
  .name('nexec')
  .command('register [options]', 'Register your favourite command').alias('r')
  .command('execute [options]', 'Exec the command name given in input', { isDefault: true }).alias('e')
  .command('delete', 'Delete the given command name').alias('d')
  .command('list', 'Show all registered command').alias('l')
  .parse(process.argv)
