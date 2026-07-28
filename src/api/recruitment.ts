import http from '@/utils/request';

export const BASE_URL = 'https://tv.bingo.vip';
export const RECRUITMENT_LIST_PATH = '/sqx_fast/app/recruitment/list';
export const RECRUITMENT_FILTER_OPTIONS_PATH = '/sqx_fast/app/recruitment/filter-options';

export type RecruitmentLanguageType = 'zh' | 'cht' | 'en';

export interface RecruitmentParams {
  languageType: RecruitmentLanguageType;
  keyword?: string;
  departmentKey?: string;
  department?: string;
  locationKey?: string;
  location?: string;
  salary?: string;
  experienceKey?: string;
  experience?: string;
}

export interface RecruitmentItem {
  id: number;
  title: string;
  department?: string;
  departmentKey?: string | null;
  location: string;
  locationKey?: string | null;
  experience: string;
  experienceKey?: string | null;
  education: string;
  salary: string;
  responsibilities: string[] | string;
  requirements: string[] | string;
  createTime?: string;
  status?: number;
  [key: string]: any;
}

export interface RecruitmentFilterConfigItem {
  groupKey: string;
  configType: 'department' | 'location' | 'experience' | string;
  languageType: RecruitmentLanguageType | string;
  name: string;
  sort: number;
  state: number;
}

export interface RecruitmentFilterOptions {
  department?: RecruitmentFilterConfigItem[] | null;
  location?: RecruitmentFilterConfigItem[] | null;
  experience?: RecruitmentFilterConfigItem[] | null;
  salary?: string[] | null;
}

export function getRecruitmentList(params: RecruitmentParams): Promise<RecruitmentItem[]> {
  return http.get<RecruitmentItem[]>(RECRUITMENT_LIST_PATH, params, {
    baseURL: BASE_URL,
  });
}

export function getRecruitmentFilterOptions(languageType: RecruitmentLanguageType): Promise<RecruitmentFilterOptions> {
  return http.get<RecruitmentFilterOptions>(RECRUITMENT_FILTER_OPTIONS_PATH, { languageType }, {
    baseURL: BASE_URL,
  });
}
