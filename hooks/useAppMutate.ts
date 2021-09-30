import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'

import {
  CREATE_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../queries/queries'
import { Task, EditTask, News, EditNews } from '../types/types'
import { resetEditedTask, resetEditedNews } from '../slices/uiSlice'

const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const cookie = new Cookie()
  const cookieToken = cookie.get('token')

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: { Authorization: `Bearer ${cookieToken}` },
    })
  }, [cookieToken])

  const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title }),
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<Task[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData<Task[]>('tasks', [
            ...previousTasks,
            res.insert_tasks_one,
          ])
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTasks.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<Task[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTasks.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const createNewsMutation = useMutation(
    (content: string) => graphQLClient.request(CREATE_NEWS, { content }),
    {
      onSuccess: (res) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>('news', [
            ...previousNews,
            res.insert_news_one,
          ])
        }
        dispatch(resetEditedNews())
      },
    }
  )

  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            'news',
            previousNews.map((news) =>
              news.id === variables.id ? res.update_news_by_pk : news
            )
          )
        }
        dispatch(resetEditedNews())
      },
    }
  )

  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            'news',
            previousNews.filter((news) => news.id !== variables)
          )
        }
        dispatch(resetEditedNews())
      },
    }
  )

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    createNewsMutation,
    updateNewsMutation,
    deleteNewsMutation,
  }
}
