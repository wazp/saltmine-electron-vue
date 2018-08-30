import firebase from 'firebase'

export default function () {
  const config = {
    apiKey: 'AIzaSyA_93fQHWXhGVGnKgESWqLxbXJhcTp21SM',
    authDomain: 'saltmine-95fb7.firebaseapp.com',
    databaseURL: 'https://saltmine-95fb7.firebaseio.com',
    projectId: 'saltmine-95fb7',
    storageBucket: 'saltmine-95fb7.appspot.com',
    messagingSenderId: '938370311800'
  }

  let App = firebase.initializeApp(config)
  return App
}
