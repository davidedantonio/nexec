'use strict'

const program = require('commander')
const db = require('./lib/data')
const inquirer = require('inquirer')
const chalk = require('chalk')
const log = require('./lib/log')

async function execute (args) {
  program
    .name('nexec delete')
    .option('-n, --name <name>', 'The name of your command')
    .parse(args)

  const list = db.list()
  let name

  if (!program.name || (typeof program.name === 'function')) {
    const ordered = list.map(x => {
      return { value: x.name, name: `${chalk.bold(x.name)}: ${x.code}` }
    })

    const response = await inquirer.prompt({
      type: 'list',
      name: 'command',
      message: 'Select a command to execute',
      choices: ordered
    })

    name = response.command
  }

  if (!name) {
    name = program.name
  }

  const command = list.find(x => x.name === name)
  if (!command) {
    log('error', `No command found with the given name ${chalk.bold(name)}`)
    process.exit(1)
  }

  const remains = list.filter(x => x.name !== name)
  db.save(remains)
}

if (require.main === module) {
  execute(process.argv)
}
