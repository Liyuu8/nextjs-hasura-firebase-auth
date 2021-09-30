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
    <div>
      {data?.map((news) => (
        <div key={news.id}>
          <ul>
            <NewsItemMemo news={news} />
          </ul>
        </div>
      ))}
    </div>
  )
}

export const NewsListMemo = memo(NewsList)
