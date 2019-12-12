'use strict'

const data = require('../../scraping/niksidata.json')

var admin = require('firebase-admin')
var serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://testagent-bfea1.firebaseio.com'
})

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.firestore()

function sleep (millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

data.forEach(function (obj) {
  return sleep(500).then(() => {
    return db.collection('hacks').add({
      title: obj.title,
      category: obj.category,
      text: obj.text,
      hilarity: obj.hilarity,
      usefulness: obj.usefulness
    }).then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
    }).catch(function (error) {
      console.error('Error adding document: ', error)
    })
  })
})
