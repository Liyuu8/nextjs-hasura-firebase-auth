import { VFC, memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setEditedTask, selectTask } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'

const TaskEdit: VFC = () => {
  const dispatch = useDispatch()
  const editedTask = useSelector(selectTask)
  const { createTaskMutation, updateTaskMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    !editedTask.id
      ? createTaskMutation.mutate(editedTask.title)
      : updateTaskMutation.mutate(editedTask)
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New task"
          value={editedTask.title}
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
        />

        <button
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounder"
          disabled={!editedTask.title}
        >
          {!editedTask.id ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const TaskEditMemo = memo(TaskEdit)
