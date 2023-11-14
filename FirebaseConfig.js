import { initializeApp } from 'firebase/app'

const temporarySecurityAPI = process.env.TEMPORARY_SECURITY_API_URL

const firebaseConfig = {
  apiKey: temporarySecurityAPI.apiKey,
  authDomain: temporarySecurityAPI.authDomain,
  projectId: temporarySecurityAPI.projectId,
  storageBucket: temporarySecurityAPI.storageBucket,
  messagingSenderId: temporarySecurityAPI.messagingSenderId,
  appId: temporarySecurityAPI.appId,
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export const db = getFirestore(app)
