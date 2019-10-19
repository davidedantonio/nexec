'use strict'

const program = require('commander')
const db = require('./lib/data')
const log = require('./lib/log')

async function execute (args) {
  program
    .name('nexec register')
    .option('-n, --name <name>', 'The name of your command')
    .option('-c, --code <code>', 'The code to execute')
    .parse(args)

  if (!program.name || !program.code) {
    program.outputHelp()
    process.exit(1)
  }

  const list = db.list()
  const exist = list.find(e => e.name === program.name)

  if (exist) {
    log('error', `A command with name ${program.name} already registered!`)
    process.exit(1)
  }

  list.push({ name: program.name, code: program.code })
  db.save(list)

  log('success', `Command with name ${program.name} registered!`)
}

if (require.main === module) {
  execute(process.argv)
}
