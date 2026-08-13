/**
 * 联系表单接口模块：使用独立 Axios 实例，以 multipart/form-data 提交咨询信息。
 */
import axios from 'axios'

export interface ContactSubmitParams {
  name: string
  organization: string
  email: string
  message: string
}

interface ContactSubmitResponse {
  code?: number
  message?: string
  msg?: string
  success?: boolean
  data?: unknown
}

const getResponseMessage = (response: ContactSubmitResponse): string => {
  return response.message || response.msg || '提交失败'
}

const contactService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

const CONTACT_SUBMIT_PATH = '/sqx_fast/app/contact/submit'

export const contactApi = {
  // 将表单字段组装为 FormData，并兼容后端 code / success 两种失败标识。
  async submit(params: ContactSubmitParams): Promise<ContactSubmitResponse> {
    const formData = new FormData()
    formData.append('name', params.name)
    formData.append('organization', params.organization)
    formData.append('email', params.email)
    formData.append('message', params.message)

    const response = await contactService.post<ContactSubmitResponse>(CONTACT_SUBMIT_PATH, formData)
    const result = response.data

    if (typeof result?.code === 'number' && result.code !== 0 && result.code !== 200) {
      throw new Error(getResponseMessage(result))
    }

    if (result?.success === false) {
      throw new Error(getResponseMessage(result))
    }

    return result
  },
}

export default contactApi
