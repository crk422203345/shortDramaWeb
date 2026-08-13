/**
 * 招聘接口模块：声明职位与筛选项的数据结构，并封装职位列表、筛选配置请求。
 */
import http from '@/utils/request'

export type RecruitmentLanguageType = 'zh' | 'cht' | 'en' | 'ms'

export interface RecruitmentListParams {
  languageType: RecruitmentLanguageType
  keyword?: string
  departmentKey?: string
  locationKey?: string
  experienceKey?: string
}

export interface Job {
  id: number
  title: string
  department?: string
  departmentKey?: string | null
  location: string
  locationKey?: string | null
  experience: string
  experienceKey?: string | null
  education: string
  salary: string
  resumeEmail?: string | null
  responsibilities: string[] | string
  requirements: string[] | string
}

export interface RecruitmentFilterOption {
  id: number
  groupKey: string
  configType: 'department' | 'location' | 'experience' | string
  languageType: RecruitmentLanguageType | string
  name: string
  sort: number
  state: number
}

export interface RecruitmentFilterOptions {
  department: RecruitmentFilterOption[] | null
  location: RecruitmentFilterOption[] | null
  experience: RecruitmentFilterOption[] | null
  salary: string[] | null
}

export const recruitmentApi = {
  // 根据语言、关键词和筛选条件查询职位。
  getRecruitmentList(params: RecruitmentListParams): Promise<Job[]> {
    return http.get<Job[]>('/sqx_fast/app/recruitment/list', params)
  },

  // 获取当前语言对应的部门、地点和经验筛选配置。
  getFilterOptions(languageType: RecruitmentLanguageType): Promise<RecruitmentFilterOptions> {
    return http.get<RecruitmentFilterOptions>('/sqx_fast/app/recruitment/filter-options', {
      languageType,
    })
  },
}

export default recruitmentApi
