'use strict'

const log = require('./lib/log')
const db = require('./lib/data')

async function execute () {
  const commands = db.list()

  if (commands.length === 0) {
    log('warn', 'No registered commands')
    process.exit(1)
  }

  for (const command of commands) {
    log('list', `${command.name}: ${command.code}`)
  }
}

if (require.main === module) {
  execute()
}
