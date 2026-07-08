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
  success?: boolean
  data?: unknown
}

const contactService = axios.create({
  baseURL: __API_BASE_URL__,
  timeout: 10000,
})

const CONTACT_SUBMIT_PATH = '/sqx_fast/app/contact/submit'

export const contactApi = {
  async submit(params: ContactSubmitParams): Promise<ContactSubmitResponse> {
    const formData = new FormData()
    formData.append('name', params.name)
    formData.append('organization', params.organization)
    formData.append('email', params.email)
    formData.append('message', params.message)

    const response = await contactService.post<ContactSubmitResponse>(CONTACT_SUBMIT_PATH, formData)
    const result = response.data

    if (result?.code && result.code !== 200) {
      throw new Error(result.message || '提交失败')
    }

    if (result?.success === false) {
      throw new Error(result.message || '提交失败')
    }

    return result
  },
}

export default contactApi
