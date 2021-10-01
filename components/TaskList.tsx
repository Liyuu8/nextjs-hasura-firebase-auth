import { VFC, memo } from 'react'
import { useQueryTasks } from '../hooks/useQueryTasks'
import { TaskItemMemo } from './TaskItem'

const TaskList: VFC = () => {
  const { status, data } = useQueryTasks()

  return status === 'loading' ? (
    <div>Loading...</div>
  ) : status === 'error' ? (
    <div>Error...</div>
  ) : (
    <ul>
      {data?.map((task) => (
        <TaskItemMemo task={task} key={task.id} />
      ))}
    </ul>
  )
}

export const TaskListMemo = memo(TaskList)
