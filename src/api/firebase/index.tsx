import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB3vZaQ41mSwiC8oG15WEj3T6KsGobZO9Q',
  authDomain: 'meu-estoque-ab504.firebaseapp.com',
  projectId: 'meu-estoque-ab504',
  storageBucket: 'meu-estoque-ab504.appspot.com',
  messagingSenderId: '446635912188',
  appId: '1:446635912188:web:e3fa531c22e52c2cea6079'
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
