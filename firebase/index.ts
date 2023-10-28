import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Config from '../api.config'

export const FirebaseCredentials = {
  appId:Config.firebaseConfig.appId,
  apiKey: Config.firebaseConfig.apiKey,
  authDomain: Config.firebaseConfig.authDomain,
  projectId: Config.firebaseConfig.projectId
}

export const app = initializeApp(FirebaseCredentials)

export default getAuth(app);