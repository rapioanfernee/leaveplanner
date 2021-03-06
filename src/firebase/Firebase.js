import * as firebase from "firebase";

class Firebase {
  constructor() {
    const dotenv = require("dotenv");
    dotenv.config();

    const config = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID
    };
    const firebase1 = firebase.initializeApp(config);
    this.ref = firebase1.database().ref();
    this.auth = firebase1.auth();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  loginWithGoogle() {
    // return this.auth.s;
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFacebook() {
    // return this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  async register(firstName, lastName, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const response = await this.auth.currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`
    });
    return response;
  }

  getCurrentUser() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
}

export default new Firebase();
