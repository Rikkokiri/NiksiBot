'use strict'

const dbtools = require('../db/dbtools')

/**
 * Retrieve a random hack
 */
async function getRandom (agent) {
  agent.add('Random niksi coming! Just hold on...')

  return dbtools.retrieveRandomHack().then(result => {
    let hack = result[0]
    agent.add(`Random hack title: ${hack.title}`)
  }).catch(err => {
    console.log(err)
    agent.add(`An error occurred. Couldn't retrieve a hack.`)
  })
}

module.exports = {
  getRandom
}
