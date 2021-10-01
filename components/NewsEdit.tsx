import { VFC, memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setEditedNews, selectNews } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'

const NewsEdit: VFC = () => {
  const dispatch = useDispatch()
  const editedNews = useSelector(selectNews)
  const { createNewsMutation, updateNewsMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    !editedNews.id
      ? createNewsMutation.mutate(editedNews.content)
      : updateNewsMutation.mutate(editedNews)
  }

  return createNewsMutation.error || updateNewsMutation.error ? (
    <div>Error...</div>
  ) : (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New news"
          value={editedNews.content}
          onChange={(e) =>
            dispatch(setEditedNews({ ...editedNews, content: e.target.value }))
          }
        />

        <button
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounder"
          disabled={!editedNews.content}
        >
          {!editedNews.id ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const NewsEditMemo = memo(NewsEdit)
