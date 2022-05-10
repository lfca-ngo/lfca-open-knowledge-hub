import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import { isDev } from '../../utils'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

if (isDev) {
  connectAuthEmulator(
    firebaseAuth,
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_EMULATOR
  )
}

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password)
}

export const logout = async () => {
  return await signOut(firebaseAuth)
}
