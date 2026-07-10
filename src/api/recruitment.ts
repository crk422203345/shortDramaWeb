import axios from 'axios'

export interface Job {
  id: number
  title: string
  location: string
  experience: string
  education: string
  salary: string
  responsibilities: string[]
  requirements: string[]
}

export interface RecruitmentListParams {
  languageType: 'zh' | 'cht' | 'en' | 'ms'
}

const recruitmentService = axios.create({
  baseURL: __API_BASE_URL__,
  timeout: 10000,
})

recruitmentService.interceptors.response.use(
  (response) => {
    const res = response.data
    // Both code 0 (standard for this API) and 200 are treated as success
    if (res.code === 0 || res.code === 200) {
      return res.data
    }
    throw new Error(res.message || '获取数据失败')
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const recruitmentApi = {
  async getRecruitmentList(params: RecruitmentListParams): Promise<Job[]> {
    const response = await recruitmentService.get('/sqx_fast/app/recruitment/list', {
      params,
    })
    return response as unknown as Job[]
  },
}

export default recruitmentApi
