import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { useQueryClient } from 'react-query'

import firebase from '../firebaseConfig'
import { unSubMeta } from './useUserChanged'
import { resetEditedNews, resetEditedTask } from '../slices/uiSlice'

const cookie = new Cookie()

export const useLogout = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const logout = async () => {
    if (unSubMeta) unSubMeta()

    await firebase.auth().signOut()

    // ストアをクリア
    dispatch(resetEditedNews())
    dispatch(resetEditedTask())

    // キャッシュをクリア
    queryClient.removeQueries('news')
    queryClient.removeQueries('tasks')

    // クッキーをクリア
    cookie.remove('token')
  }

  return { logout }
}
