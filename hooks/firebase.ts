import React from 'react'

import { FirebaseContext } from '../services/firebase'

export const useFirebase = () => {
  const firebase = React.useContext(FirebaseContext)

  return firebase
}
