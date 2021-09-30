import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import Cookie from 'universal-cookie'

import { Task } from '../types/types'
import { GET_TASKS } from '../queries/queries'

const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

interface TaskRes {
  tasks: Task[]
}

export const fetchTasks = async () => {
  const { tasks: data } = await graphQLClient.request<TaskRes>(GET_TASKS)

  return data
}

export const useQueryTasks = () => {
  const cookie = new Cookie()
  const cookieToken = cookie.get('token')

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: { Authorization: `Bearer ${cookieToken}` },
    })
  }, [cookieToken])

  return useQuery<Task[], Error>({
    queryKey: 'tasks',
    queryFn: fetchTasks,
    staleTime: 0,
  })
}
