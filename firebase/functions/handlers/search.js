const algoliasearch = require('algoliasearch')
const dotenv = require('dotenv')

dotenv.config()

// Configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

let index = algolia.initIndex('hacks')

// Perform an Algolia search:
// https://www.algolia.com/doc/api-reference/api-methods/search/
async function wordSearch (query) {
  return index
    .search({
      query: query
    })
    .then(function (responses) {
      // Response from Algolia:
      // https://www.algolia.com/doc/api-reference/api-methods/search/#response-format
      // console.log(responses.hits)
      return responses.hits
    })
    .catch(err => {
      console.log('Error', err)
      throw err
    })
}

// wordSearch('kevät').then(result => console.log('RESULT', result)).catch(err => console.log(err))

module.exports = {
  wordSearch
}
