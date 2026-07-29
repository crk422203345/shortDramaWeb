import http from '@/utils/request'

export type ArticleCategory = 'company' | 'product' | 'industry'

export interface ArticleItem {
  id: string
  title: string
  desc: string
  content?: string
  category: ArticleCategory
  image: string
  date: string
  author?: string
  source?: string
  [key: string]: any
}

export interface ArticleListParams {
  page: string
  limit: string
  keyword: string
  category?: ArticleCategory
}

export interface ArticleListResponse {
  list: ArticleItem[]
  total: number
  [key: string]: any
}

export interface ArticleDetailParams {
  id: string
}

export const consultationApi = {
  getArticleList(params: ArticleListParams): Promise<ArticleListResponse> {
    return http.get<ArticleListResponse>('/sqx_fast/app/articles/list', params)
  },

  getArticleDetail(params: ArticleDetailParams): Promise<ArticleItem> {
    return http.get<ArticleItem>('/sqx_fast/app/articles/detail', params)
  },
}

export default consultationApi
