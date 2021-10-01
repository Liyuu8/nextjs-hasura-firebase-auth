import { VFC, memo } from 'react'
import { useQueryNews } from '../hooks/useQueryNews'
import { NewsItemMemo } from './NewsItem'

const NewsList: VFC = () => {
  const { status, data } = useQueryNews()

  return status === 'loading' ? (
    <div>Loading...</div>
  ) : status === 'error' ? (
    <div>Error...</div>
  ) : (
    <ul>
      {data?.map((news) => (
        <NewsItemMemo news={news} key={news.id} />
      ))}
    </ul>
  )
}

export const NewsListMemo = memo(NewsList)
