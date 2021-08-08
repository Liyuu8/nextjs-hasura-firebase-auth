import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'

import firebase from '../firebaseConfig'

export let unSubMeta: () => void

export const useUserChanged = () => {
  const cookie = new Cookie()
  const router = useRouter()
  const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'

  useEffect(() => {
    const getHasuraClaims = async (user: firebase.User) => {
      const idTokenResult = await user.getIdTokenResult()

      return idTokenResult.claims[HASURA_TOKEN_KEY]
    }

    const setUserTokenAndTransitionTasksPage = async (user: firebase.User) => {
      const token = await user.getIdToken(true)

      cookie.set('token', token, { path: '/' })
      router.push('/tasks')
    }

    const unSubUser = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const hasuraClaims = getHasuraClaims(user)

        if (hasuraClaims) {
          setUserTokenAndTransitionTasksPage(user)
        } else {
          const userRef = firebase
            .firestore()
            .collection('user_meta')
            .doc(user.uid)

          unSubMeta = userRef.onSnapshot(async () => {
            const hasuraClaimsSnap = getHasuraClaims(user)
            console.log('userRefSnapshot called.')

            if (hasuraClaimsSnap) {
              setUserTokenAndTransitionTasksPage(user)
            }
          })
        }
      }
    })

    return () => unSubUser()
  }, [])

  return {}
}
