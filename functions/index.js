const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert("./credentials/firebase.json"),
  databaseURL: "https://node-js-functions.firebaseio.com"
});

const app = require("./app");

exports.app = functions.https.onRequest(app);
