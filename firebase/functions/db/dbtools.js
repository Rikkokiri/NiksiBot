'use strict'

const dotenv = require('dotenv')
const firebase = require('firebase')

dotenv.config()

firebase.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

const db = firebase.firestore()
let hacks = db.collection('hacks')

async function retrieveRandomHack () {
  let key = hacks.doc().id

  return hacks.where(firebase.firestore.FieldPath.documentId(), '>=', key).limit(1).get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        return snapshot.docs.map(doc => doc.data())
      } else {
        hacks.where(firebase.firestore.FieldPath.documentId(), '<', key).limit(1).get()
          .then(snapshot => {
            return snapshot.docs.map(doc => doc.data())
          })
          .catch(err => {
            console.log('Error detting documents', err)
            throw err
          })
      }
    })
    .catch(err => {
      console.log('Error getting documents', err)
      throw err
    })
}

module.exports = {
  retrieveRandomHack
}
