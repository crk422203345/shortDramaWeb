import http from '@/utils/request'

// ==========================================
// 1. TypeScript Types Definition
// ==========================================

export interface ArticleItem {
  id: string
  title: string
  desc: string
  content?: string
  category: 'company' | 'product'
  image: string
  date: string
  author?: string
  source?: string
  [key: string]: any
}

/**
 * 文章列表查询参数
 */
export interface ArticleListParams {
  page: string // 分页页码，必填
  limit: string // 单页条数，必填
  keyword: string // 搜索关键词，必填，无搜索时传空
  category?: 'company' | 'product' // 筛选分类，可选
}

/**
 * 文章列表接口响应结构
 */
export interface ArticleListResponse {
  list: ArticleItem[]
  total: number
  [key: string]: any
}

/**
 * 文章详情查询参数
 */
export interface ArticleDetailParams {
  id: string // 文章唯一标识，必填
}

// ==========================================
// 2. API Methods
// ==========================================

export const consultationApi = {
  /**
   * 获取文章列表
   * @param params Query 请求参数 (page, limit, keyword, category)
   */
  getArticleList(params: ArticleListParams): Promise<ArticleListResponse> {
    return http.get<ArticleListResponse>('/sqx_fast/app/articles/list', params)
  },

  /**
   * 获取文章详情
   * @param params Query 请求参数 (id)
   */
  getArticleDetail(params: ArticleDetailParams): Promise<ArticleItem> {
    return http.get<ArticleItem>('/sqx_fast/app/articles/detail', params)
  }
}

export default consultationApi
