import http from '@/utils/request';

/**
 * 基础域名常量管理
 */
export const BASE_URL = 'https://tv.bingo.vip';

/**
 * 招聘列表接口路由地址
 */
export const RECRUITMENT_LIST_PATH = '/sqx_fast/app/recruitment/list';

/**
 * 获取招聘列表的查询参数
 */
export interface RecruitmentParams {
  /**
   * 多语言标识：zh 简体中文、en 英文等
   */
  languageType: string;
}

/**
 * 招聘职位列表项数据结构
 */
export interface RecruitmentItem {
  id: number;
  title: string;
  location: string;
  experience: string;
  education: string;
  salary: string;
  responsibilities: string[] | string;
  requirements: string[] | string;
  createTime?: string;
  status?: number;
  [key: string]: any;
}

/**
 * 获取招聘列表数据
 * 
 * @param params 查询参数对象，包含 languageType (多语言标识)
 * @returns 招聘列表数据 Promise，利用项目全局拦截器处理成功后解构的 data
 * 
 * @example
 * ```typescript
 * import { getRecruitmentList } from '@/api/recruitment';
 * 
 * // 组件中调用示例
 * getRecruitmentList({ languageType: 'zh' })
 *   .then((data) => {
 *     console.log('获取招聘列表成功:', data);
 *   })
 *   .catch((error) => {
 *     console.error('获取招聘列表失败:', error);
 *   });
 * ```
 */
export function getRecruitmentList(params: RecruitmentParams): Promise<RecruitmentItem[]> {
  return http.get<RecruitmentItem[]>(RECRUITMENT_LIST_PATH, params, {
    baseURL: BASE_URL,
  });
}
