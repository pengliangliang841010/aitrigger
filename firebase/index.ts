import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Config from '../api.config'

export const FirebaseCredentials = {
  apiKey: Config.firebaseConfig.apiKey,
  authDomain: Config.firebaseConfig.authDomain,
  projectId: Config.firebaseConfig.projectId
}

const app=initializeApp(FirebaseCredentials)

export default getAuth(app);