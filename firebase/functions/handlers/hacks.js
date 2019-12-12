'use strict'

const dbtools = require('../db/dbtools')
const search = require('./search')

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

/**
 * Free word search
 */
async function searchByWord (agent) {
  if (agent.parameters.any) {
    let query = agent.parameters.any
    agent.add(`Searching by ${query}`)

    return search.wordSearch(query).then(results => {
      // console.log(results)
      agent.add(`Found some hacks.`)
    }).catch(err => {
      console.log(err)
      agent.add(`An error occurred while searching.`)
    })
  } else {
    agent.add(`Couldn't separate the search term from our input`)
    return null
  }
}

module.exports = {
  getRandom,
  searchByWord
}
