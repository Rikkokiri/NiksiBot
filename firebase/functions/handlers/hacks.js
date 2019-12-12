'use strict'

const dbtools = require('../db/dbtools')
const search = require('./search')

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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
      // agent.add(`Found ${results.length} matches, here's one:`)
      let hack = results[getRandomInt(0, results.length - 1)]
      agent.add(`*_${hack.title}:_*`)
      agent.add(`_${hack.text.replace('\n', ' ')}_`)
    }).catch(err => {
      console.log(err)
      agent.add(`An error occurred while searching.`)
    })
  } else {
    agent.add(`Couldn't separate the search term from our input`)
    return null
  }
}

/**
 * Count by word
 */
async function hackCount (agent) {
  if (agent.parameters.any) {
    let query = agent.parameters.any

    return search.wordSearch(query).then(results => {
      // TODO:
    })
  } else {
    agent.add('Alltogether my database has 5964 lifehacks.')
    agent.add('But Niksi-Pirkka website has 48895 hacks.')
  }
}

/**
* Find best and worst rated niksit (hilarity and usefulness)
*/

module.exports = {
  getRandom,
  searchByWord,
  hackCount
}
