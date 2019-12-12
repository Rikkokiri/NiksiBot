'use strict'

const hackHandlers = require('./handlers/hacks')

/* const botSmalltalkHandlers = require('./handlers/smalltalk/bots')
const daysHandlers = require('./handlers/smalltalk/days')
const humorHandlers = require('./handlers/smalltalk/humor')
const weatherHandlers = require('./handlers/smalltalk/weather') */

module.exports.mapHandlersToIntents = (agent) => {
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map()

  // Query hacks
  intentMap.set('niksi.getRandom', hackHandlers.getRandom)
  intentMap.set('niksi.searchBy', hackHandlers.searchByWord)
  intentMap.set('niksi.count', hackHandlers.niksiCount)

  // Smalltalk
  /*
  intentMap.set('smalltalk.bots.relationshipToOtherBots', botSmalltalkHandlers.relationshipToOtherBots)
  intentMap.set('smalltalk.whatDayIsIt', daysHandlers.whatDayIsIt)
  intentMap.set('smalltalk.UserRequestsJoke', humorHandlers.tellAJoke)
  intentMap.set('smalltalk.weather.userCommentsWeather', weatherHandlers.weatherComment)
  intentMap.set('smalltalk.weather.userRequestsAgentOpinion', weatherHandlers.weatherComment) // Could be given a separate handler some day
  intentMap.set('smalltalk.weather.userRequestsForecast', weatherHandlers.weatherForecast)
  intentMap.set('smalltalk.weather.userRequestsForecast.anotherTime', weatherHandlers.weatherForecast)
  */

  agent.handleRequest(intentMap)
}
