/**
 * 资讯中心接口模块：定义文章数据契约，并提供列表、详情两个请求入口。
 */
import http from '@/utils/request'

export type ArticleCategory = 'company' | 'product' | 'industry'
export type ArticleLanguageType = 'zh' | 'cht' | 'en' | 'ms'

export interface ArticleItem {
  id: number | string
  title: string
  category: ArticleCategory
  author: string | null
  publishDate: string
  coverImage: string | null
  content: string | null
  languageType: ArticleLanguageType
  sourceUrl: string | null
  detailLinkUrl: string | null
  source_url?: string | null
  detail_link_url?: string | null
}

export interface ArticleListParams {
  page: string
  limit: string
  keyword: string
  languageType: ArticleLanguageType
  category?: ArticleCategory
}

export interface ArticleListResponse {
  list: ArticleItem[]
  totalCount: number
  pageSize: number
  totalPage: number
  currPage: number
}

export interface ArticleDetailParams {
  id: string
}

export const consultationApi = {
  // 按语言、分类和分页条件获取资讯列表。
  getArticleList(params: ArticleListParams): Promise<ArticleListResponse> {
    return http.get<ArticleListResponse>('/sqx_fast/app/articles/list', params)
  },

  // 根据文章 ID 获取完整正文及来源链接。
  getArticleDetail(params: ArticleDetailParams): Promise<ArticleItem> {
    return http.get<ArticleItem>('/sqx_fast/app/articles/detail', params)
  },
}

export default consultationApi
