'use strict'

const log = require('./log')
const fs = require('fs')
const path = require('path')
const os = require('os')

const FILENAME = path.join(os.homedir(), 'db.json')

function checkDB () {
  if (!fs.existsSync(FILENAME)) {
    fs.writeFileSync(FILENAME, '[]', 'utf-8')
  }

  return fs.readFileSync(FILENAME)
}

function list () {
  const db = checkDB()
  try {
    const list = JSON.parse(db)
    return list.sort((a, b) => a.name > b.name)
  } catch (e) {
    log('error', e)
  }
}

function save (db) {
  fs.writeFileSync(FILENAME, JSON.stringify(db), 'utf-8')
}

module.exports = {
  checkDB,
  list,
  save
}
