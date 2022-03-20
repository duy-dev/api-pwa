const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require('express');
const app = express();
const db = admin.firestore();

const cors = require('cors');
app.use(cors({ origin: true }));

// Routers
app.get('/hello', (req, res) => {
  return res.status(200).send('Hello PWA');
});

// Create
app.post('/api/test', (req, res) => {
  (async () => {
    console.log('name: ', req.body.name);
    console.log('age: ', req.body.age);
    try {
      await db.collection('test').doc(`/${req.body.id}/`).create({
        name: req.body.name,
        age: req.body.age,
      });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// Get

// Get all

exports.app = functions.https.onRequest(app);
