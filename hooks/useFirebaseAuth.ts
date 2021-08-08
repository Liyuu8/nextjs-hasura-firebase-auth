import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

import firebase from '../firebaseConfig'

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const emailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  )
  const passwordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
    []
  )
  const resetInput = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])
  const toggleMode = useCallback(() => setIsLogin(!isLogin), [isLogin])

  const authUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        isLogin
          ? await firebase.auth().signInWithEmailAndPassword(email, password)
          : await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
      } catch (e) {
        alert(e.message)
      }

      resetInput()
    },
    [email, password, isLogin]
  )

  return {
    email,
    password,
    emailChange,
    passwordChange,
    resetInput,
    isLogin,
    toggleMode,
    authUser,
  }
}
