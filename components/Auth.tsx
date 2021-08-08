import { VFC } from 'react'
import Link from 'next/link'
import {
  ChevronDoubleRightIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid'

import { useFirebaseAuth } from '../hooks/useFirebaseAuth'
import firebase from '../firebaseConfig'

export const Auth: VFC = () => {
  const user = firebase.auth().currentUser
  const {
    isLogin,
    email,
    password,
    emailChange,
    passwordChange,
    authUser,
    toggleMode,
  } = useFirebaseAuth()

  return user ? (
    <Link href="/tasks" passHref>
      <div className="flex items-center cursor-pointer my-3">
        <ChevronDoubleRightIcon className="h-5 w-5 mx-1 text-blue-500" />
        <span>to tasks page</span>
      </div>
    </Link>
  ) : (
    <>
      <form
        onSubmit={authUser}
        className="flex flex-col justify-center items-center mt-8"
      >
        <label>Email:</label>
        <input
          type="text"
          className="my-3 px-3 py-1 border border-gray-300"
          placeholder="email?"
          value={email}
          onChange={emailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          className="my-3 px-3 py-1 border border-gray-300"
          placeholder="password?"
          value={password}
          onChange={passwordChange}
        />

        <button
          className="disabled:opacity-40 mt-5 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
          type="submit"
          disabled={!email || !password}
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <SwitchVerticalIcon
        className="my-5 h-5 w-5 text-blue-500 cursor-pointer"
        onClick={toggleMode}
      />
    </>
  )
}
