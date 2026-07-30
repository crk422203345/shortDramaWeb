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
  getRecruitmentList(params: RecruitmentListParams): Promise<Job[]> {
    return http.get<Job[]>('/sqx_fast/app/recruitment/list', params)
  },

  getFilterOptions(languageType: RecruitmentLanguageType): Promise<RecruitmentFilterOptions> {
    return http.get<RecruitmentFilterOptions>('/sqx_fast/app/recruitment/filter-options', {
      languageType,
    })
  },
}

export default recruitmentApi
